const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrderItem = sequelize.define('OrderItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'order_items',
});

module.exports = OrderItem;
