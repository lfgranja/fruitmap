"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable('reviews', {
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true,
            },
            tree_id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'trees',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            user_id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            rating: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5,
                },
            },
            comment: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            updated_at: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        });
        await queryInterface.addIndex('reviews', ['tree_id']);
        await queryInterface.addIndex('reviews', ['user_id']);
        await queryInterface.addIndex('reviews', ['tree_id', 'user_id'], {
            unique: true,
            name: 'unique_user_tree_review',
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('reviews');
    },
};
//# sourceMappingURL=create-reviews-table.js.map