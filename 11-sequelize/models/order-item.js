const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../util/database");

const OrderItem = sequelize.define("orderItem", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  quantity: INTEGER.UNSIGNED,
});

module.exports = OrderItem;
