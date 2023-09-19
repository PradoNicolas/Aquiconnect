import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/sequelize";

class Instance extends Model<InferAttributes<Instance>, InferCreationAttributes<Instance>> {
    declare id: CreationOptional<number>
    declare session: string
    declare token: string
    declare phone: string | null

    declare is_active: boolean
    declare in_maturation: boolean
    declare is_maturated: boolean
    declare is_banned: boolean
    declare last_ref_instance: number | null
    declare url: string

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Instance.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        session: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        token: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        phone: {
            type: new DataTypes.STRING(255)
        },
        last_ref_instance: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: null
        },
        url: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        in_maturation: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_maturated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_banned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, 
    {
        tableName: 'instances',
        sequelize
    }
)

export default Instance