import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../config/sequelize";

class MaturationGroup extends Model<InferAttributes<MaturationGroup>, InferCreationAttributes<MaturationGroup>> {
    declare id: CreationOptional<number>
    declare name: string
    declare left_delay: number
    declare right_delay: number
    declare begin_date: Date
    declare end_date: Date

    declare is_active: boolean

    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

MaturationGroup.init(
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
        left_delay: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 120
        },
        right_delay: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 240
        },
        begin_date: DataTypes.TIME,
        end_date: DataTypes.TIME,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, 
    {
        tableName: 'maturation_groups',
        sequelize
    }
)

export default MaturationGroup