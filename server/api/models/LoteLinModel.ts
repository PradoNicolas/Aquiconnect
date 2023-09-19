import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import sequelize from "../../config/sequelize";
import LoteHdr from "./LoteHdrModel";

class LoteLin extends Model<InferAttributes<LoteLin>, InferCreationAttributes<LoteLin>> {
    declare id: CreationOptional<number>

    declare loteHdrId: ForeignKey<LoteHdr['id']>
    declare loteHdr?: NonAttribute<LoteHdr>

    declare message: string
    declare number: string
    declare imageUrl: string | null
    declare fileBase64: string | null
    declare conclusionDate: Date | null

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

LoteLin.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        message: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        number: {
            type: new DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        imageUrl: new DataTypes.STRING(255),
        fileBase64: DataTypes.TEXT,
        conclusionDate: DataTypes.DATE,

        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        tableName: 'lotes_lin',
        sequelize
    }
)

export default LoteLin