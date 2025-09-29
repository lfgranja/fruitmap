import { Model, Optional } from 'sequelize';
interface TreeSpeciesAttributes {
    id: number;
    name: string;
    scientificName?: string;
    description?: string;
    isNative: boolean;
    nutritionalInfo?: string;
    createdAt: Date;
    updatedAt: Date;
}
interface TreeSpeciesCreationAttributes extends Optional<TreeSpeciesAttributes, 'id' | 'scientificName' | 'description' | 'isNative' | 'nutritionalInfo' | 'createdAt' | 'updatedAt'> {
}
declare class TreeSpecies extends Model<TreeSpeciesAttributes, TreeSpeciesCreationAttributes> implements TreeSpeciesAttributes {
    id: number;
    name: string;
    scientificName?: string;
    description?: string;
    isNative: boolean;
    nutritionalInfo?: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default TreeSpecies;
//# sourceMappingURL=TreeSpecies.d.ts.map