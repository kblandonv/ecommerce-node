const { Sequelize } = require('sequelize');
require('dotenv').config();

const isTest = process.env.NODE_ENV === 'test';

// En producción intentamos primero DB_URL, luego DATABASE_URL
const connectionString = isTest
  ? null
  : (process.env.DB_URL || process.env.DATABASE_URL);

if (!isTest && !connectionString) {
  console.error('❌ Error: No se encontró ni DB_URL ni DATABASE_URL en las variables de entorno');
  process.exit(1);
}

const sequelize = isTest
  ? new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false
    })
  : new Sequelize(connectionString, {
      dialect: 'postgres',
      logging: false
    });

module.exports = sequelize;
