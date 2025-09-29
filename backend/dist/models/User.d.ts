import { Model, Optional } from 'sequelize';
interface UserAttributes {
    id: string;
    email: string;
    password: string;
    username: string;
    fullName?: string;
    location?: string;
    role: string;
    isActive: boolean;
    emailVerified: boolean;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'fullName' | 'location' | 'role' | 'isActive' | 'emailVerified'> {
}
declare class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id: string;
    email: string;
    password: string;
    username: string;
    fullName?: string;
    location?: string;
    role: string;
    isActive: boolean;
    emailVerified: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default User;
//# sourceMappingURL=User.d.ts.map