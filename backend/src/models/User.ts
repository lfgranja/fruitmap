// src/models/User.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Tree from './Tree'; // Import Tree model
import Review from './Review'; // Import Review model

interface UserAttributes {
  id: string;
  email: string;
  password: string;
  username: string;
  fullName?: string;
  location?: string; // JSON string for coordinates
  role: string;
  isActive: boolean;
  emailVerified: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'fullName' | 'location' | 'role' | 'isActive' | 'emailVerified'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password!: string;
  public username!: string;
  public fullName?: string;
  public location?: string;
  public role!: string;
  public isActive!: boolean;
  public emailVerified!: boolean;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    User.hasMany(models.Tree, { foreignKey: 'contributorId', as: 'contributedTrees' });
    User.hasMany(models.Review, { foreignKey: 'userId', as: 'reviews' });
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 30],
    },
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING, // Store as JSON string
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
    validate: {
      isIn: [['user', 'admin', 'moderator']],
    },
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'users',
  sequelize,
});

export default User;
