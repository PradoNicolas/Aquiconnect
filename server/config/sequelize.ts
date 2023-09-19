import { Sequelize } from "sequelize"

const sequelize = new Sequelize('aquiconnect', process.env.MYSQL_USER!, process.env.MYSQL_PASSWORD!, {
    host: "127.0.0.1",
    port: 3306,
    dialect: 'mysql'
})

export = sequelize