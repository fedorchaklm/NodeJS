import * as cartRepository from "../repositories/cart.repository";
import * as productRepository from "../repositories/product.repository";
import { Cart, TotalCart } from "../types/types";

export const addProductToCart = (userId: string, productId: number): Cart => {
  const product = productRepository.getProductById(productId);
  const cart = cartRepository.updateCart(userId, product);
  return cart;
};

export const removeProductFromCart = (userId: string, productId: number): Cart => {
  const cart = cartRepository.deleteProductFromCart(userId, productId);
  return cart;
};

export const getCartWithTotalPrice = (userId: string): TotalCart => {
  const cart = cartRepository.getCart(userId);
  const totalPrice = cartRepository.getTotalPriceOfCart(userId);
  return { ...cart, totalPrice };
};
