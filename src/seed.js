require('dotenv').config();
const db = require('./config/db');
const { Product } = require('./models');

const products = [
  {
    name: 'Camiseta básica',
    description: 'Camiseta de algodón, disponible en varios colores.',
    price: 19.99,
    stock: 50,
  },
  {
    name: 'Jean clásico',
    description: 'Pantalón de mezclilla con corte recto.',
    price: 49.50,
    stock: 30,
  },
  {
    name: 'Zapatillas deportivas',
    description: 'Zapatillas para correr, suela antideslizante.',
    price: 89.90,
    stock: 20,
  },
  {
    name: 'Mochila urbana',
    description: 'Mochila resistente al agua, capacidad 20L.',
    price: 39.00,
    stock: 15,
  },
  {
    name: 'Gorra ajustable',
    description: 'Gorra unisex con visera curva.',
    price: 14.25,
    stock: 40,
  }
];

const seed = async () => {
  try {
    await db.authenticate();
    console.log('✔️ Conexión a la DB OK');
    // No forzamos drop, solo insertamos si no existen
    await db.sync();
    console.log('📦 Tablas sincronizadas');

    for (const p of products) {
      const [prod, created] = await Product.findOrCreate({
        where: { name: p.name },
        defaults: p
      });
      console.log(`${created ? ' Creado' : '🔄 Ya existe'}: ${prod.name}`);
    }

    console.log('✅ Seed completado');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error en seed:', err);
    process.exit(1);
  }
};

seed();
