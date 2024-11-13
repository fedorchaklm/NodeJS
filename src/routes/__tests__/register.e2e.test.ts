// POST /api/register
import request from 'supertest';
import app, { startServer, stopServer } from '../../index';
import { APP_ROLES } from '../../types/types';
import { clearDB, connectDB } from '../../db/db';
import { UserModel } from '../../models/user.model';

describe('Register API E2E TESTS', () => {
  beforeAll(async () => {
    await startServer();
    await clearDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  afterAll(() => {
    stopServer();
  });

  it('should register new user', async () => {
    const res = await request(app).post('/api/register').send({
      email: 'sun.jones.2@epam.com',
      name: 'Mary Smith',
      password: 'a2A!abcd',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual('Mary Smith');
    expect(res.body.email).toEqual('sun.jones.2@epam.com');
  });

  it('should throw error if user already exists', async () => {
    await request(app).post('/api/register').send({
      email: 'love.jones.2@epam.com',
      name: 'Ann Smith',
      password: 'a2A!abcd',
    });
    const res = await request(app).post('/api/register').send({
      email: 'love.jones.2@epam.com',
      name: 'Ann Smith',
      password: 'a2A!abcd',
    });
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toBe('Email is in use');
  });
});
