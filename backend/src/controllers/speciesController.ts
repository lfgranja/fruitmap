// src/controllers/speciesController.ts
import { Request, Response } from 'express';
import db from '../models';

// Get all tree species
const getAllSpecies = async (req: Request, res: Response) => {
  try {
    const species = await db.TreeSpecies.findAll({
      attributes: ['id', 'name', 'scientificName'],
      order: [['name', 'ASC']]
    });

    res.status(200).json({ species });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single species by ID
const getSpeciesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const species = await db.TreeSpecies.findByPk(id, {
      attributes: ['id', 'name', 'scientificName', 'description', 'isNative']
    });

    if (!species) {
      return res.status(404).json({ error: 'Species not found' });
    }

    res.status(200).json({ species });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllSpecies,
  getSpeciesById
};