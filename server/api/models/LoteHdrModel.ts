import { Association, CreationOptional, DataTypes, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import sequelize from "../../config/sequelize";
import LoteLin from "./LoteLinModel";

class LoteHdr extends Model<InferAttributes<LoteHdr>, InferCreationAttributes<LoteHdr>> {
    declare id: CreationOptional<number>

    declare name: string | null
    declare limit: number | null
    declare closedDate: Date | null

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>

    declare getLoteLins: HasManyGetAssociationsMixin<LoteLin>; // Note the null assertions!
    declare addLoteLin: HasManyAddAssociationMixin<LoteLin, number>;
    declare addLoteLins: HasManyAddAssociationsMixin<LoteLin, number>;
    declare setLoteLins: HasManySetAssociationsMixin<LoteLin, number>;
    declare removeLoteLin: HasManyRemoveAssociationMixin<LoteLin, number>;
    declare removeLoteLins: HasManyRemoveAssociationsMixin<LoteLin, number>;
    declare hasLoteLin: HasManyHasAssociationMixin<LoteLin, number>;
    declare hasLoteLins: HasManyHasAssociationsMixin<LoteLin, number>;
    declare countLoteLins: HasManyCountAssociationsMixin;
    declare createLoteLin: HasManyCreateAssociationMixin<LoteLin, 'loteHdrId'>;

    declare loteLins?: NonAttribute<LoteLin[]>

    declare static associations: {
        loteLins: Association<LoteHdr, LoteLin>
    }
}

LoteHdr.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: new DataTypes.STRING(255),
            unique: true
        },
        limit: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 250
        },
        closedDate: DataTypes.DATE,

        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        tableName: 'lotes_hdr',
        sequelize
    }
)

LoteHdr.hasMany(LoteLin, {
    sourceKey: 'id',
    foreignKey: 'loteHdrId',
    as: 'loteLins'
})

export default LoteHdr