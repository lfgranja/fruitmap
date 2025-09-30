// src/models/index.ts
import { Sequelize } from 'sequelize';
import User from './User';
import Tree from './Tree';
import TreeSpecies from './TreeSpecies';
import sequelize from '../config/database';

// Define associations
User.hasMany(Tree, { foreignKey: 'contributorId', as: 'contributedTrees' });
Tree.belongsTo(User, { foreignKey: 'contributorId', as: 'treeContributor' });

TreeSpecies.hasMany(Tree, { foreignKey: 'speciesId', as: 'trees' });
Tree.belongsTo(TreeSpecies, { foreignKey: 'speciesId', as: 'species' });

const db = {
  User,
  Tree,
  TreeSpecies,
  sequelize,
};

export default db;