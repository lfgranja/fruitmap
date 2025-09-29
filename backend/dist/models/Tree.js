"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const User_1 = __importDefault(require("./User"));
class Tree extends sequelize_1.Model {
}
Tree.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    speciesId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    contributorId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 200],
        },
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    accessibility: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'public',
        validate: {
            isIn: [['public', 'community', 'private-permission', 'restricted']],
        },
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'active',
        validate: {
            isIn: [['active', 'inactive', 'seasonal', 'removed']],
        },
    },
}, {
    tableName: 'trees',
    sequelize: database_1.default,
    hooks: {
        beforeCreate: (tree) => {
            try {
                JSON.parse(tree.location);
            }
            catch (e) {
                throw new Error('Location must be valid GeoJSON');
            }
        },
        beforeUpdate: (tree) => {
            try {
                JSON.parse(tree.location);
            }
            catch (e) {
                throw new Error('Location must be valid GeoJSON');
            }
        },
    },
});
Tree.belongsTo(User_1.default, { foreignKey: 'contributorId', as: 'contributor' });
exports.default = Tree;
//# sourceMappingURL=Tree.js.map