// src/services/geospatialService.ts
import db from '../models';

interface Point {
  lat: number;
  lng: number;
}

interface BoundingBox {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

interface SearchResult {
  id: string;
  title: string;
  species: string;
  location: string;
  distance?: number; // Distance in meters
}

class GeospatialService {
  /**
   * Find trees within a bounding box
   */
  async findTreesInBounds(boundingBox: BoundingBox): Promise<any[]> {
    // In a real implementation with PostGIS, we would use ST_Within or ST_Intersects
    // For this implementation, we'll simulate by parsing the location field
    const trees = await db.Tree.findAll({
      where: {
        status: 'active'
      },
      include: [
        {
          model: db.User,
          as: 'contributor',
          attributes: ['id', 'username']
        },
        {
          model: db.TreeSpecies,
          as: 'species',
          attributes: ['id', 'name', 'scientificName']
        }
      ]
    });

    // Filter trees based on bounding box
    const filteredTrees = trees.filter(tree => {
      try {
        const location = JSON.parse(tree.location);
        if (location.type === 'Point') {
          const [lng, lat] = location.coordinates;
          return (
            lat >= boundingBox.minLat &&
            lat <= boundingBox.maxLat &&
            lng >= boundingBox.minLng &&
            lng <= boundingBox.maxLng
          );
        }
      } catch (e) {
        console.error('Error parsing location:', e);
      }
      return false;
    });

    return filteredTrees;
  }

  /**
   * Find trees near a specific point within a radius
   */
  async findTreesNearPoint(center: Point, radiusKm: number): Promise<any[]> {
    const trees = await db.Tree.findAll({
      where: {
        status: 'active'
      },
      include: [
        {
          model: db.User,
          as: 'contributor',
          attributes: ['id', 'username']
        },
        {
          model: db.TreeSpecies,
          as: 'species',
          attributes: ['id', 'name', 'scientificName']
        }
      ]
    });

    // Filter trees based on distance
    const filteredTrees = trees.filter(tree => {
      try {
        const location = JSON.parse(tree.location);
        if (location.type === 'Point') {
          const [lng, lat] = location.coordinates;
          const distance = this.calculateDistance(center.lat, center.lng, lat, lng);
          return distance <= radiusKm * 1000; // Convert km to meters
        }
      } catch (e) {
        console.error('Error parsing location:', e);
      }
      return false;
    });

    // Add distance to each tree
    const treesWithDistance = filteredTrees.map(tree => {
      const location = JSON.parse(tree.location);
      const [lng, lat] = location.coordinates;
      const distance = this.calculateDistance(center.lat, center.lng, lat, lng);
      
      return {
        ...tree.toJSON(),
        distance: Math.round(distance) // Distance in meters
      };
    });

    // Sort by distance
    treesWithDistance.sort((a, b) => a.distance - b.distance);

    return treesWithDistance;
  }

  /**
   * Calculate distance between two points using Haversine formula
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  }

  /**
   * Get trees by species with location filtering
   */
  async getTreesBySpecies(speciesId: number, boundingBox?: BoundingBox): Promise<any[]> {
    const whereClause: any = { 
      speciesId,
      status: 'active'
    };

    if (boundingBox) {
      // This is a simplified version - a real implementation would use PostGIS
      const allTrees = await db.Tree.findAll({
        where: whereClause,
        include: [
          {
            model: db.User,
            as: 'contributor',
            attributes: ['id', 'username']
          },
          {
            model: db.TreeSpecies,
            as: 'species',
            attributes: ['id', 'name', 'scientificName']
          }
        ]
      });

      // Filter by bounding box
      return allTrees.filter(tree => {
        try {
          const location = JSON.parse(tree.location);
          if (location.type === 'Point') {
            const [lng, lat] = location.coordinates;
            return (
              lat >= boundingBox.minLat &&
              lat <= boundingBox.maxLat &&
              lng >= boundingBox.minLng &&
              lng <= boundingBox.maxLng
            );
          }
        } catch (e) {
          console.error('Error parsing location:', e);
        }
        return false;
      });
    } else {
      return await db.Tree.findAll({
        where: whereClause,
        include: [
          {
            model: db.User,
            as: 'contributor',
            attributes: ['id', 'username']
          },
          {
            model: db.TreeSpecies,
            as: 'species',
            attributes: ['id', 'name', 'scientificName']
          }
        ]
      });
    }
  }
}

export default new GeospatialService();