const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const OrderItem = require('./orderItem');

// Un usuario tiene muchas órdenes
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Una orden tiene muchos items
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// Un producto puede aparecer en muchos items
Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = { User, Product, Order, OrderItem };
