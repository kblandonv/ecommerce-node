const { Order, OrderItem, Product } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body; // [{ productId, quantity }, ...]
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'La orden necesita al menos un item' });
    }

    // Crea la orden asociada al usuario
    const order = await Order.create({ userId: req.user.id });

    let total = 0;
    // Recorre los items y créalos
    for (const { productId, quantity } of items) {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: `Producto ${productId} no encontrado` });
      }
      const price = parseFloat(product.price);
      await OrderItem.create({
        orderId: order.id,
        productId: product.id,
        quantity,
        price,
      });
      total += price * quantity;
    }

    // Actualiza el total de la orden
    order.total = total;
    await order.save();

    // Devuelve la orden con sus items y productos
    const fullOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          include: [ Product ]
        }
      ]
    });

    res.status(201).json(fullOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear orden' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: OrderItem,
          include: [ Product ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar órdenes' });
  }
};
