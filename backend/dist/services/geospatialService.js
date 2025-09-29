"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
class GeospatialService {
    async findTreesInBounds(boundingBox) {
        const trees = await models_1.default.Tree.findAll({
            where: {
                status: 'active'
            },
            include: [
                {
                    model: models_1.default.User,
                    as: 'contributor',
                    attributes: ['id', 'username']
                },
                {
                    model: models_1.default.TreeSpecies,
                    as: 'species',
                    attributes: ['id', 'name', 'scientificName']
                }
            ]
        });
        const filteredTrees = trees.filter(tree => {
            try {
                const location = JSON.parse(tree.location);
                if (location.type === 'Point') {
                    const [lng, lat] = location.coordinates;
                    return (lat >= boundingBox.minLat &&
                        lat <= boundingBox.maxLat &&
                        lng >= boundingBox.minLng &&
                        lng <= boundingBox.maxLng);
                }
            }
            catch (e) {
                console.error('Error parsing location:', e);
            }
            return false;
        });
        return filteredTrees;
    }
    async findTreesNearPoint(center, radiusKm) {
        const trees = await models_1.default.Tree.findAll({
            where: {
                status: 'active'
            },
            include: [
                {
                    model: models_1.default.User,
                    as: 'contributor',
                    attributes: ['id', 'username']
                },
                {
                    model: models_1.default.TreeSpecies,
                    as: 'species',
                    attributes: ['id', 'name', 'scientificName']
                }
            ]
        });
        const filteredTrees = trees.filter(tree => {
            try {
                const location = JSON.parse(tree.location);
                if (location.type === 'Point') {
                    const [lng, lat] = location.coordinates;
                    const distance = this.calculateDistance(center.lat, center.lng, lat, lng);
                    return distance <= radiusKm * 1000;
                }
            }
            catch (e) {
                console.error('Error parsing location:', e);
            }
            return false;
        });
        const treesWithDistance = filteredTrees.map(tree => {
            const location = JSON.parse(tree.location);
            const [lng, lat] = location.coordinates;
            const distance = this.calculateDistance(center.lat, center.lng, lat, lng);
            return {
                ...tree.toJSON(),
                distance: Math.round(distance)
            };
        });
        treesWithDistance.sort((a, b) => a.distance - b.distance);
        return treesWithDistance;
    }
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3;
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    async getTreesBySpecies(speciesId, boundingBox) {
        const whereClause = {
            speciesId,
            status: 'active'
        };
        if (boundingBox) {
            const allTrees = await models_1.default.Tree.findAll({
                where: whereClause,
                include: [
                    {
                        model: models_1.default.User,
                        as: 'contributor',
                        attributes: ['id', 'username']
                    },
                    {
                        model: models_1.default.TreeSpecies,
                        as: 'species',
                        attributes: ['id', 'name', 'scientificName']
                    }
                ]
            });
            return allTrees.filter(tree => {
                try {
                    const location = JSON.parse(tree.location);
                    if (location.type === 'Point') {
                        const [lng, lat] = location.coordinates;
                        return (lat >= boundingBox.minLat &&
                            lat <= boundingBox.maxLat &&
                            lng >= boundingBox.minLng &&
                            lng <= boundingBox.maxLng);
                    }
                }
                catch (e) {
                    console.error('Error parsing location:', e);
                }
                return false;
            });
        }
        else {
            return await models_1.default.Tree.findAll({
                where: whereClause,
                include: [
                    {
                        model: models_1.default.User,
                        as: 'contributor',
                        attributes: ['id', 'username']
                    },
                    {
                        model: models_1.default.TreeSpecies,
                        as: 'species',
                        attributes: ['id', 'name', 'scientificName']
                    }
                ]
            });
        }
    }
}
exports.default = new GeospatialService();
//# sourceMappingURL=geospatialService.js.map