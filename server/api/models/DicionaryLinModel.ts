import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/sequelize";

class DicionaryLin extends Model<InferAttributes<DicionaryLin>, InferCreationAttributes<DicionaryLin>> {
    declare id: CreationOptional<number>
    declare text: string
    declare image_url: string|null
    declare last_date_used: Date

    declare is_active: number

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

DicionaryLin.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        text: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        image_url: {
            type: new DataTypes.STRING(255),
        },
        last_date_used: DataTypes.DATE,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, 
    {
        tableName: 'dicionaries_lin',
        sequelize
    }
)

export default DicionaryLin