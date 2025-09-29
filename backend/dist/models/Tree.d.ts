import { Model, Optional } from 'sequelize';
import User from './User';
interface TreeAttributes {
    id: string;
    speciesId: number;
    location: string;
    contributorId: string;
    title: string;
    description?: string;
    accessibility: string;
    isVerified: boolean;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
interface TreeCreationAttributes extends Optional<TreeAttributes, 'id' | 'description' | 'isVerified' | 'status' | 'createdAt' | 'updatedAt'> {
}
declare class Tree extends Model<TreeAttributes, TreeCreationAttributes> implements TreeAttributes {
    id: string;
    speciesId: number;
    location: string;
    contributorId: string;
    title: string;
    description?: string;
    accessibility: string;
    isVerified: boolean;
    status: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    getUser: () => Promise<User>;
}
export default Tree;
//# sourceMappingURL=Tree.d.ts.map