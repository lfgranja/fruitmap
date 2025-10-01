import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Tree from './Tree';

interface ReviewAttributes {
  id: string;
  userId: string;
  treeId: string;
  rating: number;
  comment?: string;
}

interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'id'> {}

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  public id!: string;
  public userId!: string;
  public treeId!: string;
  public rating!: number;
  public comment?: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    treeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Tree,
        key: 'id',
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'reviews',
    sequelize,
  }
);

export default Review;
