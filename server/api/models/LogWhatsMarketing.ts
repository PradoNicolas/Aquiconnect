/*import { DataTypes } from "sequelize"
import sequelize from "../../config/sequelize"

const LogWhatsMarketing = sequelize.define('LogWhatsMarketing', {
    lwm_codigo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lwm_numero: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    dsEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    dtBorn: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            isBefore: (() => {
                let date = new Date();
                date.setDate(date.getDate() + 1)
                
                return date.toISOString().slice(0,10)
            })()
        }
    },
}, {
    tableName: 'log_whats_marketing'
})*/