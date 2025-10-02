// src/controllers/treeController.ts
import { Request, Response } from 'express';
import db from '../models';
import { AuthRequest } from '../middleware/auth';
import geospatialService from '../services/geospatialService';
import { Op } from 'sequelize';

// Get all trees with optional filtering
const getAllTrees = async (req: Request, res: Response) => {
  try {
    const { 
      speciesId, 
      accessibility, 
      status, 
      limit = 50, 
      offset = 0,
      minLat,
      maxLat,
      minLng,
      maxLng,
      lat,
      lng,
      radius
    } = req.query;

    const whereClause: any = {};
    
    if (speciesId) whereClause.speciesId = speciesId;
    if (accessibility) whereClause.accessibility = accessibility;
    if (status) whereClause.status = status;

    // Geographic bounds filtering
    let trees;
    
    if (minLat && maxLat && minLng && maxLng) {
      // Filter by bounding box using the geospatial service
      trees = await geospatialService.findTreesInBounds({
        minLat: parseFloat(minLat as string),
        maxLat: parseFloat(maxLat as string),
        minLng: parseFloat(minLng as string),
        maxLng: parseFloat(maxLng as string)
      });
    } else if (lat && lng && radius) {
      // Filter by radius around a point
      trees = await geospatialService.findTreesNearPoint({
        lat: parseFloat(lat as string),
        lng: parseFloat(lng as string)
      }, parseFloat(radius as string));
    } else {
      // Get all trees without geographic filtering
      trees = await db.Tree.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit as string, 10),
        offset: parseInt(offset as string, 10),
        include: [
          {
            model: db.User,
            as: 'contributor',
            attributes: ['id', 'username', 'fullName']
          },
          {
            model: db.TreeSpecies,
            as: 'species',
            attributes: ['id', 'name', 'scientificName']
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      // If trees is an object with rows and count (from findAndCountAll), extract the rows
      if ('rows' in trees) {
        trees = (trees as any).rows;
      }
    }

    // If we used the geospatial service, we need to manually handle pagination
    let paginatedTrees = trees;
    let total = trees.length;
    
    if (minLat || lat) {
      // Apply pagination for geospatial results
      const start = parseInt(offset as string, 10);
      const end = start + parseInt(limit as string, 10);
      paginatedTrees = trees.slice(start, end);
      total = trees.length;
    }

    return res.status(200).json({
      trees: paginatedTrees,
      pagination: {
        total,
        limit: parseInt(limit as string, 10),
        offset: parseInt(offset as string, 10),
        pages: Math.ceil(total / parseInt(limit as string, 10))
      }
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a single tree by ID
const getTreeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tree = await db.Tree.findByPk(id, {
      include: [
        {
          model: db.User,
          as: 'contributor',
          attributes: ['id', 'username', 'fullName']
        },
        {
          model: db.TreeSpecies,
          as: 'species',
          attributes: ['id', 'name', 'scientificName', 'description', 'nutritionalInfo']
        }
      ]
    });

    if (!tree) {
      return res.status(404).json({ error: 'Tree not found' });
    }

    return res.status(200).json({ tree });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Create a new tree
const createTree = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { speciesId, location, title, description, accessibility } = req.body;

    // Validate location format (should be GeoJSON or coordinate string)
    let parsedLocation;
    try {
      parsedLocation = JSON.parse(location);
      if (!parsedLocation.type || !parsedLocation.coordinates) {
        throw new Error('Invalid GeoJSON format');
      }
    } catch (e) {
      // If it's not JSON, assume it's a coordinate string like "lat,lng"
      if (typeof location === 'string' && location.includes(',')) {
        const [lat, lng] = location.split(',').map(Number);
        if (isNaN(lat) || isNaN(lng)) {
          return res.status(400).json({ error: 'Invalid coordinate format' });
        }
        parsedLocation = { type: 'Point', coordinates: [lng, lat] };
      } else {
        return res.status(400).json({ error: 'Location must be valid GeoJSON or coordinate string' });
      }
    }

    const tree = await db.Tree.create({
      speciesId,
      location: JSON.stringify(parsedLocation),
      contributorId: req.user.id,
      title,
      description,
      accessibility: accessibility || 'public',
      isVerified: false, // New trees are not verified by default
      status: 'active'
    });

    return res.status(201).json({
      message: 'Tree created successfully',
      tree
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a tree
const updateTree = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { id } = req.params;
    const { speciesId, location, title, description, accessibility, status } = req.body;

    const tree = await db.Tree.findByPk(id);

    if (!tree) {
      return res.status(404).json({ error: 'Tree not found' });
    }

    // Only allow the contributor or an admin to update the tree
    if (tree.contributorId !== req.user.id) {
      const user = await db.User.findByPk(req.user.id);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized to update this tree' });
      }
    }

    // Update the tree
    await tree.update({
      speciesId: speciesId !== undefined ? speciesId : tree.speciesId,
      location: location !== undefined ? location : tree.location,
      title: title !== undefined ? title : tree.title,
      description: description !== undefined ? description : tree.description,
      accessibility: accessibility !== undefined ? accessibility : tree.accessibility,
      status: status !== undefined ? status : tree.status
    });

    return res.status(200).json({
      message: 'Tree updated successfully',
      tree
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a tree
const deleteTree = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { id } = req.params;

    const tree = await db.Tree.findByPk(id);

    if (!tree) {
      return res.status(404).json({ error: 'Tree not found' });
    }

    // Only allow the contributor or an admin to delete the tree
    if (tree.contributorId !== req.user.id) {
      const user = await db.User.findByPk(req.user.id);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized to delete this tree' });
      }
    }

    await tree.destroy();

    return res.status(200).json({
      message: 'Tree deleted successfully'
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Search trees by location or other criteria
const searchTrees = async (req: Request, res: Response) => {
  try {
    const { query, species, lat, lng, radius } = req.query;

    if (lat && lng && radius) {
      // Use geospatial service for location-based search
      const trees = await geospatialService.findTreesNearPoint(
        {
          lat: parseFloat(lat as string),
          lng: parseFloat(lng as string)
        },
        parseFloat(radius as string)
      );

      // Filter by query if provided
      if (query) {
        const searchTerm = (query as string).toLowerCase();
        const filteredTrees = trees.filter(tree => 
          tree.title.toLowerCase().includes(searchTerm) ||
          tree.species.name.toLowerCase().includes(searchTerm) ||
          (tree.description && tree.description.toLowerCase().includes(searchTerm))
        );
        
        return res.status(200).json({ 
          trees: filteredTrees,
          total: filteredTrees.length
        });
      } else {
        return res.status(200).json({ 
          trees,
          total: trees.length
        });
      }
    } else {
      // Use database query for non-location-based search
      const whereClause: any = { status: 'active' };
      
      if (query) {
        whereClause.title = { [Op.iLike]: `%${query}%` };
      }
      
      if (species) {
        whereClause.speciesId = species;
      }

      const trees = await db.Tree.findAll({
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
            attributes: ['id', 'name']
          }
        ]
      });

      return res.status(200).json({ 
        trees,
        total: trees.length
      });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Get trees by species
const getTreesBySpecies = async (req: Request, res: Response) => {
  try {
    const { speciesId } = req.params;
    const { minLat, maxLat, minLng, maxLng } = req.query;

    let trees;
    
    if (minLat && maxLat && minLng && maxLng) {
      // Filter by bounding box using the geospatial service
      trees = await geospatialService.getTreesBySpecies(parseInt(speciesId, 10), {
        minLat: parseFloat(minLat as string),
        maxLat: parseFloat(maxLat as string),
        minLng: parseFloat(minLng as string),
        maxLng: parseFloat(maxLng as string)
      });
    } else {
      trees = await geospatialService.getTreesBySpecies(parseInt(speciesId, 10));
    }

    return res.status(200).json({ 
      trees,
      total: trees.length
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  getAllTrees,
  getTreeById,
  createTree,
  updateTree,
  deleteTree,
  searchTrees,
  getTreesBySpecies
};