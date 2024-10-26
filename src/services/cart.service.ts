import * as cartRepository from '../repositories/cart.repository';
import * as productRepository from '../repositories/product.repository';
import { Cart, TotalCart } from '../types/types';

export const addProductToCart = async (userId: string, productId: string): Promise<Cart> => {
  const product = await productRepository.getProductById(productId);
  const cart = await cartRepository.updateCart(userId, product);
  return cart;
};

export const removeProductFromCart = (userId: string, productId: string): Promise<Cart> => {
  const cart = cartRepository.deleteProductFromCart(userId, productId);
  return cart;
};

export const getCartWithTotalPrice = async (userId: string): Promise<TotalCart> => {
  const cart = await cartRepository.getCart(userId);
  // const totalPrice = cartRepository.getTotalPriceOfCart(userId);
  // return { ...cart, totalPrice };
  return { ...cart, totalPrice: 10 };
};
