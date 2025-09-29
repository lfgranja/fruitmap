import { Sequelize } from 'sequelize';
import User from './User';
import Tree from './Tree';
import TreeSpecies from './TreeSpecies';
declare const db: {
    User: typeof User;
    Tree: typeof Tree;
    TreeSpecies: typeof TreeSpecies;
    sequelize: Sequelize;
};
export default db;
//# sourceMappingURL=index.d.ts.map