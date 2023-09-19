import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/sequelize";

class DicionaryHdr extends Model<InferAttributes<DicionaryHdr>, InferCreationAttributes<DicionaryHdr>> {
    declare id: CreationOptional<number>
    declare name: string|null
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

DicionaryHdr.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, 
    {
        tableName: 'dicionaries_hdr',
        sequelize
    }
)

export default DicionaryHdr