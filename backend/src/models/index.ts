import { Sequelize } from 'sequelize';
import User from './User';
import Tree from './Tree';
import Review from './Review';
import Review from './Review';
import sequelize from '../config/database';

interface Models {
  User: typeof User;
  Tree: typeof Tree;
  TreeSpecies: typeof TreeSpecies;
  Review: typeof Review;
  [key: string]: any;
}

const models: Models = {
  User,
  Tree,
  TreeSpecies,
  Review,
  Review,
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

const db = {
  ...models,
  sequelize,
};

export default db;
