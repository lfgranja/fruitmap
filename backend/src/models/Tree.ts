// src/models/Tree.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User'; // Import User model
import Review from './Review'; // Import Review model
import Review from './Review'; // Import Review model

interface TreeAttributes {
  id: string;
  speciesId: number;
  location: string; // GeoJSON or coordinates string
  contributorId: string;
  title: string;
  description?: string;
  accessibility: string;
  isVerified: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TreeCreationAttributes extends Optional<TreeAttributes, 'id' | 'description' | 'isVerified' | 'status' | 'createdAt' | 'updatedAt'> {}

class Tree extends Model<TreeAttributes, TreeCreationAttributes> implements TreeAttributes {
  public id!: string;
  public speciesId!: number;
  public location!: string;
  public contributorId!: string;
  public title!: string;
  public description?: string;
  public accessibility!: string;
  public isVerified!: boolean;
  public status!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods
  public getUser!: () => Promise<User>;

  static associate(models: any) {
    Tree.belongsTo(models.User, { foreignKey: 'contributorId', as: 'treeContributor' }); // Use treeContributor alias
    Tree.belongsTo(models.TreeSpecies, { foreignKey: 'speciesId', as: 'species' });
    Tree.hasMany(models.Review, { foreignKey: 'treeId', as: 'reviews' });
    Tree.hasMany(models.Review, { foreignKey: 'treeId', as: 'reviews' });
  }
}

Tree.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  speciesId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING, // For storing coordinates or GeoJSON
    allowNull: false,
  },
  contributorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 200],
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  accessibility: {
    type: DataTypes.STRING,
    defaultValue: 'public',
    validate: {
      isIn: [['public', 'community', 'private-permission', 'restricted']],
    },
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
    validate: {
      isIn: [['active', 'inactive', 'seasonal', 'removed']],
    },
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
  tableName: 'trees',
  sequelize,
  hooks: {
    beforeCreate: (tree) => {
      // Ensure location is properly formatted
      try {
        JSON.parse(tree.location);
      } catch (e) {
        throw new Error('Location must be valid GeoJSON');
      }
    },
    beforeUpdate: (tree) => {
      // Ensure location is properly formatted
      try {
        JSON.parse(tree.location);
      } catch (e) {
        throw new Error('Location must be valid GeoJSON');
      }
    },
  },
});

export default Tree;
