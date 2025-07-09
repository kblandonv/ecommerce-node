require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const { User, Product, Order, OrderItem } = require('./models');

const swaggerUi   = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const authRoutes    = require('./routes/auth');
const productRoutes = require('./routes/product');
const userRoutes    = require('./routes/user');
const orderRoutes   = require('./routes/order');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

// **Ruta raíz de prueba**
app.get('/', (req, res) => {
  res.send('🚀 API corriendo');
});

// Rutas existentes
app.use('/auth',    authRoutes);
app.use('/products',productRoutes);
app.use('/me',      userRoutes);
app.use('/orders',  orderRoutes);

// Ruta de documentación
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


module.exports = app;
