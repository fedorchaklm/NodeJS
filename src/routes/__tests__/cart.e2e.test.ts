import request from 'supertest';
import app, { startServer, stopServer } from '../../index';
import { UserModel } from '../../models/user.model';
import { CartModel } from '../../models/cart.model';
import { ProductModel } from '../../models/product.model';
import config from '../../config';
import { createAdmin } from '../../createAdmin';

let product: any;

describe('PUT /api/cart/{productId} E2E TESTS', () => {
  beforeAll(async () => {
    await startServer();
  });

  beforeEach(async () => {
    await UserModel.deleteMany();
    await CartModel.deleteMany();
    await ProductModel.deleteMany();

    await createAdmin(config.adminPassword, config.adminName, config.adminEmail);
    const loginRes = await request(app).post('/api/login').send({
      email: config.adminEmail,
      password: config.adminPassword,
    });
    const cookies = loginRes.headers['set-cookie'];
    console.log(cookies);
    product = await request(app).post('/api/products').set('Cookie', cookies).send({
      name: 'apple',
      description: 'fresh fruit',
      category: 'fruits',
      price: 11,
    });
    console.log(product.body.id);
  });

  afterAll(() => {
    stopServer();
  });

  it('should add product to cart', async () => {
    const user = await request(app).post('/api/register').send({
      email: 'sun4444.jones.2@epam.com',
      name: 'Mary Smith',
      password: 'a2A!abcd',
    });
    const loginRes = await request(app).post('/api/login').send({
      email: 'sun4444.jones.2@epam.com',
      password: 'a2A!abcd',
    });
    const cookies = loginRes.headers['set-cookie'];
    const productId = product.body.id;
    const userId = user.body.id;
    console.log({ productId, userId });
    const res = await request(app).put(`/api/cart/${productId}`).set('Cookie', cookies).set({ 'x-user-id': userId });
    console.log('body', res.body, product.id);
    expect(res.statusCode).toEqual(200);
    expect(res.body.products.find(({ id }) => id === productId)).toBeTruthy();
  });

  it('should throw error "Unauthorized"', async () => {
    await request(app).post('/api/register').send({
      email: 'sun4444.jones.2@epam.com',
      name: 'Mary Smith',
      password: 'a2A!abcd',
    });
    const productId = product.body.id;
    const res = await request(app).put(`/api/cart/${productId}`);
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Unauthorized');
  });
});
