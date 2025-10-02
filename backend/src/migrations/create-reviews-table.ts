// backend/src/migrations/create-reviews-table.ts
import { QueryInterface, DataTypes } from 'sequelize';
 
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('reviews', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users', // name of the User model table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      treeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'trees', // name of the Tree model table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
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
    });

    // Create index for better query performance
    await queryInterface.addIndex('reviews', ['userId']);
    await queryInterface.addIndex('reviews', ['treeId']);
    await queryInterface.addIndex('reviews', ['userId', 'treeId'], {
      unique: true,
      name: 'unique_user_tree_review',
    });
  },
 
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('reviews');
  },
};
