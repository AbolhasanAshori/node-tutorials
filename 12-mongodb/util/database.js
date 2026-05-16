const os = require("node:os");

const { Sequelize } = require("sequelize");

const dbType = os.platform() === "linux" ? "mariadb" : "mysql";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT ?? 3306),
  dialect: process.env.DB_TYPE ?? dbType,
});

module.exports = sequelize;
