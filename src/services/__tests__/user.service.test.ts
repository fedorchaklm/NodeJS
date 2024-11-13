import * as userService from '../user.service';
import { connectDB, disconnectDB } from '../../db/db';
import { UserModel } from '../../models/user.model';
import { APP_ROLES } from '../../types/types';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

beforeEach(async () => {
  await UserModel.deleteMany();
});

describe('UserService Integration Tests', () => {
  it('should register new user', async () => {
    const user = {
      email: 'examples.jones.2@epam.com',
      name: 'Mary Smith',
      password: 'a2A!abcd',
    };
    const newUser = await userService.registerNewUser(user);
    expect(newUser).toHaveProperty('id');
    expect(newUser.name).toBe('Mary Smith');
    expect(newUser.email).toBe('examples.jones.2@epam.com');
    expect(newUser.role).toBe(APP_ROLES.Customer);
  });

  it('should register new user', async () => {
    const newUser = {
      email: 'examples.jones.2@epam.com',
      name: 'Mary Smith',
      password: 'a2A!abcd',
    };
    const user = await userService.registerNewUser(newUser);
    expect(user).not.toBeNull();
  });

  it('should throw error "Email is in use"', async () => {
    const newUser = {
      email: 'examples.jones.2@epam.com',
      name: 'Mary Smith',
      password: 'a2A!abcd',
    };
    const newUser2 = {
      email: 'examples.jones.2@epam.com',
      name: 'Mary Smith',
      password: 'a2A!abcd',
    };
    await userService.registerNewUser(newUser);
    await expect(userService.registerNewUser(newUser2)).rejects.toThrow('Email is in use');
  });

  it('should  throw error "No such user with such email"', async () => {
    await expect(userService.getUserByEmail('examples.jones.2@epam.com')).rejects.toThrow(
      'No such user with such email'
    );
  });
});
