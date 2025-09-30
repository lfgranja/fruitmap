// src/models/TreeSpecies.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Tree from './Tree'; // Import Tree model

interface TreeSpeciesAttributes {
  id: number;
  name: string;
  scientificName?: string;
  description?: string;
  isNative: boolean;
  nutritionalInfo?: string; // JSON string
  createdAt: Date;
  updatedAt: Date;
}

interface TreeSpeciesCreationAttributes extends Optional<TreeSpeciesAttributes, 'id' | 'scientificName' | 'description' | 'isNative' | 'nutritionalInfo' | 'createdAt' | 'updatedAt'> {}

class TreeSpecies extends Model<TreeSpeciesAttributes, TreeSpeciesCreationAttributes> implements TreeSpeciesAttributes {
  public id!: number;
  public name!: string;
  public scientificName?: string;
  public description?: string;
  public isNative!: boolean;
  public nutritionalInfo?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    TreeSpecies.hasMany(models.Tree, { foreignKey: 'speciesId', as: 'species' });
  }
}

TreeSpecies.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  scientificName: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isNative: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  nutritionalInfo: {
    type: DataTypes.JSON, // Store as JSON object
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'tree_species',
  sequelize,
});

export default TreeSpecies;
