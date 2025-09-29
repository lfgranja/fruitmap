"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
const geospatialService_1 = __importDefault(require("../services/geospatialService"));
const getAllTrees = async (req, res) => {
    try {
        const { speciesId, accessibility, status, limit = 50, offset = 0, minLat, maxLat, minLng, maxLng, lat, lng, radius } = req.query;
        const whereClause = {};
        if (speciesId)
            whereClause.speciesId = speciesId;
        if (accessibility)
            whereClause.accessibility = accessibility;
        if (status)
            whereClause.status = status;
        let trees;
        if (minLat && maxLat && minLng && maxLng) {
            trees = await geospatialService_1.default.findTreesInBounds({
                minLat: parseFloat(minLat),
                maxLat: parseFloat(maxLat),
                minLng: parseFloat(minLng),
                maxLng: parseFloat(maxLng)
            });
        }
        else if (lat && lng && radius) {
            trees = await geospatialService_1.default.findTreesNearPoint({
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            }, parseFloat(radius));
        }
        else {
            trees = await models_1.default.Tree.findAndCountAll({
                where: whereClause,
                limit: parseInt(limit, 10),
                offset: parseInt(offset, 10),
                include: [
                    {
                        model: models_1.default.User,
                        as: 'contributor',
                        attributes: ['id', 'username', 'fullName']
                    },
                    {
                        model: models_1.default.TreeSpecies,
                        as: 'species',
                        attributes: ['id', 'name', 'scientificName']
                    }
                ],
                order: [['createdAt', 'DESC']]
            });
            if ('rows' in trees) {
                trees = trees.rows;
            }
        }
        let paginatedTrees = trees;
        let total = trees.length;
        if (minLat || lat) {
            const start = parseInt(offset, 10);
            const end = start + parseInt(limit, 10);
            paginatedTrees = trees.slice(start, end);
            total = trees.length;
        }
        res.status(200).json({
            trees: paginatedTrees,
            pagination: {
                total,
                limit: parseInt(limit, 10),
                offset: parseInt(offset, 10),
                pages: Math.ceil(total / parseInt(limit, 10))
            }
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getTreeById = async (req, res) => {
    try {
        const { id } = req.params;
        const tree = await models_1.default.Tree.findByPk(id, {
            include: [
                {
                    model: models_1.default.User,
                    as: 'contributor',
                    attributes: ['id', 'username', 'fullName']
                },
                {
                    model: models_1.default.TreeSpecies,
                    as: 'species',
                    attributes: ['id', 'name', 'scientificName', 'description', 'nutritionalInfo']
                }
            ]
        });
        if (!tree) {
            return res.status(404).json({ error: 'Tree not found' });
        }
        res.status(200).json({ tree });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const createTree = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const { speciesId, location, title, description, accessibility } = req.body;
        let parsedLocation;
        try {
            parsedLocation = JSON.parse(location);
            if (!parsedLocation.type || !parsedLocation.coordinates) {
                throw new Error('Invalid GeoJSON format');
            }
        }
        catch (e) {
            if (typeof location === 'string' && location.includes(',')) {
                const [lat, lng] = location.split(',').map(Number);
                if (isNaN(lat) || isNaN(lng)) {
                    return res.status(400).json({ error: 'Invalid coordinate format' });
                }
                parsedLocation = { type: 'Point', coordinates: [lng, lat] };
            }
            else {
                return res.status(400).json({ error: 'Location must be valid GeoJSON or coordinate string' });
            }
        }
        const tree = await models_1.default.Tree.create({
            speciesId,
            location: JSON.stringify(parsedLocation),
            contributorId: req.user.id,
            title,
            description,
            accessibility: accessibility || 'public',
            isVerified: false,
            status: 'active'
        });
        res.status(201).json({
            message: 'Tree created successfully',
            tree
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateTree = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const { id } = req.params;
        const { speciesId, location, title, description, accessibility, status } = req.body;
        const tree = await models_1.default.Tree.findByPk(id);
        if (!tree) {
            return res.status(404).json({ error: 'Tree not found' });
        }
        if (tree.contributorId !== req.user.id) {
            const user = await models_1.default.User.findByPk(req.user.id);
            if (!user || user.role !== 'admin') {
                return res.status(403).json({ error: 'Not authorized to update this tree' });
            }
        }
        await tree.update({
            speciesId: speciesId !== undefined ? speciesId : tree.speciesId,
            location: location !== undefined ? location : tree.location,
            title: title !== undefined ? title : tree.title,
            description: description !== undefined ? description : tree.description,
            accessibility: accessibility !== undefined ? accessibility : tree.accessibility,
            status: status !== undefined ? status : tree.status
        });
        res.status(200).json({
            message: 'Tree updated successfully',
            tree
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteTree = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const { id } = req.params;
        const tree = await models_1.default.Tree.findByPk(id);
        if (!tree) {
            return res.status(404).json({ error: 'Tree not found' });
        }
        if (tree.contributorId !== req.user.id) {
            const user = await models_1.default.User.findByPk(req.user.id);
            if (!user || user.role !== 'admin') {
                return res.status(403).json({ error: 'Not authorized to delete this tree' });
            }
        }
        await tree.destroy();
        res.status(200).json({
            message: 'Tree deleted successfully'
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const searchTrees = async (req, res) => {
    try {
        const { query, species, lat, lng, radius } = req.query;
        if (lat && lng && radius) {
            const trees = await geospatialService_1.default.findTreesNearPoint({
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            }, parseFloat(radius));
            if (query) {
                const searchTerm = query.toLowerCase();
                const filteredTrees = trees.filter(tree => tree.title.toLowerCase().includes(searchTerm) ||
                    tree.species.name.toLowerCase().includes(searchTerm) ||
                    (tree.description && tree.description.toLowerCase().includes(searchTerm)));
                res.status(200).json({
                    trees: filteredTrees,
                    total: filteredTrees.length
                });
            }
            else {
                res.status(200).json({
                    trees,
                    total: trees.length
                });
            }
        }
        else {
            const whereClause = { status: 'active' };
            if (query) {
                whereClause.title = { [models_1.default.sequelize.Op.iLike]: `%${query}%` };
            }
            if (species) {
                whereClause.speciesId = species;
            }
            const trees = await models_1.default.Tree.findAll({
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
                        attributes: ['id', 'name']
                    }
                ]
            });
            res.status(200).json({
                trees,
                total: trees.length
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getTreesBySpecies = async (req, res) => {
    try {
        const { speciesId } = req.params;
        const { minLat, maxLat, minLng, maxLng } = req.query;
        let trees;
        if (minLat && maxLat && minLng && maxLng) {
            trees = await geospatialService_1.default.getTreesBySpecies(parseInt(speciesId, 10), {
                minLat: parseFloat(minLat),
                maxLat: parseFloat(maxLat),
                minLng: parseFloat(minLng),
                maxLng: parseFloat(maxLng)
            });
        }
        else {
            trees = await geospatialService_1.default.getTreesBySpecies(parseInt(speciesId, 10));
        }
        res.status(200).json({
            trees,
            total: trees.length
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.default = {
    getAllTrees,
    getTreeById,
    createTree,
    updateTree,
    deleteTree,
    searchTrees,
    getTreesBySpecies
};
//# sourceMappingURL=treeController.js.map