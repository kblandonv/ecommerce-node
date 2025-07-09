/*const express = require('express');
const db = require('./config/db');
require('dotenv').config();
const { User, Product, Order, OrderItem } = require('./models');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes   = require('./routes/order');


const app = express();
app.use(express.json());

// Rutas públicas
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => res.send('🚀 API corriendo'));

// Ruta protegida
app.use('/me', userRoutes);
app.use('/orders', orderRoutes);

const start = async () => {
  try {
    await db.authenticate();
    console.log('✔️ Conexión a PostgreSQL exitosa');
    // Sincroniza tablas (crea si no existen)
    await db.sync(); 
    console.log('📦 Modelos sincronizados');
  } catch (err) {
    console.error('❌ Error al inicializar la base de datos:', err);
    process.exit(1);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🔊 Servidor escuchando en http://localhost:${port}`);
  });
};

start();
*/
// src/index.js

const app = require("./app");
const db = require("./config/db");

const start = async () => {
  try {
    await db.authenticate();
    console.log("✔️ DB OK");
    await db.sync();
    console.log("📦 Modelos sincronizados");
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`🔊 Servidor en http://localhost:${port}`)
    );
  } catch (err) {
    console.error("❌ Error al iniciar:", err);
    process.exit(1);
  }
};

start();
