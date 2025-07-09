const request = require('supertest');
const app     = require('../src/app');
const db      = require('../src/config/db');
const { User, Product, OrderItem } = require('../src/models');
const bcrypt  = require('bcryptjs');

let token;

beforeAll(async () => {
  // Arranca con la DB en blanco
  await db.sync({ force: true });

  // Crea un user y obtén su token
  const hash = await bcrypt.hash('secret123', 10);
  await User.create({ name: 'OrderUser', email: 'order@test.com', password_hash: hash });
  const resLogin = await request(app)
    .post('/auth/login')
    .send({ email: 'order@test.com', password: 'secret123' });
  token = resLogin.body.token;

  // Crea algunos productos
  await Product.bulkCreate([
    { name: 'Prod1', price: 5.0, stock: 10 },
    { name: 'Prod2', price: 7.5, stock:  5 },
  ]);
});

afterAll(async () => {
  await db.close();
});

describe('🧾 Order Endpoints', () => {
  it('POST /orders → 201 + order con items', async () => {
    const res = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 },
        ]
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.total).toBe('17.50');
    expect(res.body.OrderItems).toHaveLength(2);
    res.body.OrderItems.forEach(item => {
      expect(item).toHaveProperty('Product');
      expect(item.Product).toHaveProperty('id', item.productId);
    });
  });

  it('GET /orders → 200 + array con al menos una orden', async () => {
    const res = await request(app)
      .get('/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.orders)).toBe(true);
    expect(res.body.orders.length).toBeGreaterThanOrEqual(1);
  });

  it('POST /orders sin auth → 401', async () => {
    const res = await request(app)
      .post('/orders')
      .send({ items: [{ productId: 1, quantity: 1 }] });
    expect(res.statusCode).toBe(401);
  });

  it('POST /orders con producto inválido → 404', async () => {
    const res = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ items: [{ productId: 999, quantity: 1 }] });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('simula fallo interno en OrderItem.create → 500', async () => {
    // Mockeamos OrderItem.create para lanzar un error
    const spy = jest.spyOn(OrderItem, 'create').mockImplementation(() => {
      throw new Error('DB fallo simulado');
    });

    const res = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [{ productId: 1, quantity: 1 }]
      });

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error', 'Error al crear orden');

    // Restauramos la implementación original
    spy.mockRestore();
  });
});
