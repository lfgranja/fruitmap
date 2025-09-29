"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
const Tree_1 = __importDefault(require("./Tree"));
const TreeSpecies_1 = __importDefault(require("./TreeSpecies"));
const database_1 = __importDefault(require("../config/database"));
User_1.default.hasMany(Tree_1.default, { foreignKey: 'contributorId', as: 'contributedTrees' });
Tree_1.default.belongsTo(User_1.default, { foreignKey: 'contributorId', as: 'contributor' });
TreeSpecies_1.default.hasMany(Tree_1.default, { foreignKey: 'speciesId', as: 'trees' });
Tree_1.default.belongsTo(TreeSpecies_1.default, { foreignKey: 'speciesId', as: 'species' });
const db = {
    User: User_1.default,
    Tree: Tree_1.default,
    TreeSpecies: TreeSpecies_1.default,
    sequelize: database_1.default,
};
exports.default = db;
//# sourceMappingURL=index.js.map