const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../util/database");

const CartItem = sequelize.define("cartItem", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  quantity: INTEGER.UNSIGNED,
});

module.exports = CartItem;
