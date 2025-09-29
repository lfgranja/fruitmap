"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const treeController_1 = __importDefault(require("../controllers/treeController"));
const auth_1 = __importDefault(require("../middleware/auth"));
const treeValidation_1 = __importDefault(require("../validations/treeValidation"));
const router = (0, express_1.Router)();
router.get('/', treeController_1.default.getAllTrees);
router.get('/search', treeValidation_1.default.searchValidation, treeController_1.default.searchTrees);
router.get('/:id', treeController_1.default.getTreeById);
router.post('/', auth_1.default, treeValidation_1.default.createTreeValidation, treeController_1.default.createTree);
router.patch('/:id', auth_1.default, treeValidation_1.default.updateTreeValidation, treeController_1.default.updateTree);
router.delete('/:id', auth_1.default, treeController_1.default.deleteTree);
exports.default = router;
//# sourceMappingURL=treeRoutes.js.map