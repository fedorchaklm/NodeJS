import * as cartService from '../services/cart.service';
import * as productService from '../services/product.service';
import * as userService from '../services/user.service';
import { connectDB, disconnectDB } from '../db/db';
import { CartModel } from '../models/cart.model';
import { ProductModel } from '../models/product.model';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

beforeEach(async () => {
  await CartModel.deleteMany();
  await ProductModel.deleteMany();
});

describe('CartService Integration Tests', () => {
  it('should', async () => {
    const product = await productService.addProduct({
      name: 'apple',
      description: 'fresh fruit',
      category: 'fruits',
      price: 11,
    });
    const user = {
      email: 'examples.jones.2@epam.com',
      name: 'Mary Smith',
      password: 'a2A!abcd',
    };
    const newUser = await userService.registerNewUser(user);
    const { id } = newUser;
    // const cart = await cartService.addProductToCart(id, product.id);
  });
});
