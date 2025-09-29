"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class TreeSpecies extends sequelize_1.Model {
}
TreeSpecies.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    scientificName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    isNative: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    nutritionalInfo: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
}, {
    tableName: 'tree_species',
    sequelize: database_1.default,
});
exports.default = TreeSpecies;
//# sourceMappingURL=TreeSpecies.js.map