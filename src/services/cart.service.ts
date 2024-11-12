import { NotFoundError } from '../common/errors';
import * as cartRepository from '../repositories/cart.repository';
import * as productRepository from '../repositories/product.repository';
import { Cart, TotalOrder } from '../types/types';

export const addProductToCart = async (userId: string, productId: string): Promise<Cart> => {
  const cart = await cartRepository.getCart(userId);
  const product = await productRepository.getProductById(productId);
  if (product === null) {
    throw new NotFoundError();
  }
  cart.products.push(product);
  await cartRepository.updateCart(cart);
  return cart;
};

export const removeProductFromCart = async (userId: string, productId: string): Promise<Cart> => {
  const cart = await cartRepository.getCart(userId);
  const index = cart.products.findIndex(({ id }) => id === productId);
  if (index < 0) {
    throw new NotFoundError();
  }
  cart.products.splice(index, 1);
  await cartRepository.updateCart(cart);
  return cart;
};

export const getTotalOrder = async (userId: string): Promise<TotalOrder> => {
  const cart = await cartRepository.getCart(userId);
  const totalPrice = cart.products.reduce((acc, { price }) => acc + price, 0);
  return { ...cart, totalPrice };
};
