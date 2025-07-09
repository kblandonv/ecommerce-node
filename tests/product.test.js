const request = require('supertest');
const app     = require('../src/app');
const db      = require('../src/config/db');
const { Product } = require('../src/models');

beforeAll(async () => {
  await db.sync({ force: true });
  await Product.bulkCreate([
    { name: 'A', description: 'desc A', price: 10, stock: 5 },
    { name: 'B', description: 'desc B', price: 20, stock: 3 },
  ]);
});

afterAll(async () => {
  await db.close();
});

describe('📦 Product Endpoints', () => {
  it('GET /products → 200 + array', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.products)).toBe(true);
    expect(res.body.products).toHaveLength(2);
  });

  it('GET /products/:id → 200 + object', async () => {
    const res = await request(app).get('/products/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.product).toHaveProperty('id', 1);
  });
});
