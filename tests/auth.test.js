const request = require('supertest');
const app     = require('../src/app');
const db      = require('../src/config/db');
const { User } = require('../src/models');
const bcrypt  = require('bcryptjs');

beforeAll(async () => {
  await db.sync({ force: true });
});

afterAll(async () => {
  await db.close();
});

describe('🔐 Auth Endpoints', () => {
  it('POST /auth/register → 201 + token', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ name: 'Test', email: 'test@example.com', password: 'pass1234' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('POST /auth/login → 200 + token', async () => {
    // crear user manualmente
    const hash = await bcrypt.hash('pass1234', 10);
    await User.create({ name: 'Login', email: 'login@example.com', password_hash: hash });

    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'login@example.com', password: 'pass1234' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
