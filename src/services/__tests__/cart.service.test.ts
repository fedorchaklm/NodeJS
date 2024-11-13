import * as cartService from '../cart.service';
import * as productService from '../product.service';
import * as userService from '../user.service';
import { connectDB, disconnectDB } from '../../db/db';
import { CartModel } from '../../models/cart.model';
import { ProductModel } from '../../models/product.model';
import { UserModel } from '../../models/user.model';
import { Product, User } from '../../types/types';

const user = {
  email: 'examples.jones.2@epam.com',
  name: 'Mary Smith',
  password: 'a2A!abcd',
};

describe('CartService Integration Tests', () => {
  let product: Product;
  let newUser: User;

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  beforeEach(async () => {
    product = await productService.addProduct({
      name: 'banana',
      description: 'fresh fruit',
      category: 'fruits',
      price: 88,
    });
    newUser = await userService.registerNewUser(user);
  });

  afterEach(async () => {
    await UserModel.deleteMany();
    await CartModel.deleteMany();
    await ProductModel.deleteMany();
  });

  it('should add product to cart', async () => {
    const cart = await cartService.addProductToCart(newUser.id, product.id);
    expect(cart.products.find(({ id }) => id === product.id)).toBeTruthy();
  });

  it('should throw error "Product is not found"', async () => {
    await expect(cartService.addProductToCart(newUser.id, 'wrongid')).rejects.toThrow('Product is not found');
  });

  it('should remove product from cart', async () => {
    await cartService.addProductToCart(newUser.id, product.id);
    const cart = await cartService.removeProductFromCart(newUser.id, product.id);
    expect(cart.products.find(({ id }) => id === product.id)).toBeFalsy();
  });

  it('should throw error "Product is not found"', async () => {
    await cartService.addProductToCart(newUser.id, product.id);
    await expect(cartService.removeProductFromCart(newUser.id, 'wrongid')).rejects.toThrow('Product is not found');
  });

  it('should return cart with total price 11"', async () => {
    await cartService.addProductToCart(newUser.id, product.id);
    const cart = await cartService.getTotalOrder(newUser.id);
    expect(cart.totalPrice).toBe(88);
  });

  it('should return cart with total price 33"', async () => {
    await cartService.addProductToCart(newUser.id, product.id);
    await cartService.addProductToCart(newUser.id, product.id);
    await cartService.addProductToCart(newUser.id, product.id);
    const cart = await cartService.getTotalOrder(newUser.id);
    expect(cart.totalPrice).toBe(264);
  });
});
