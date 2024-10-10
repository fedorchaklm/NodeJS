import * as cartRepository from "../repositories/cart.repository.js";
import * as productRepository from "../repositories/product.repository.js";

export const addProductToCart = (userId, productId) => {
  const product = productRepository.getProductById(productId);
  const cart = cartRepository.updateCart(userId, product);
  return cart;
};

export const removeProductFromCart = (userId, productId) => {
  const cart = cartRepository.deleteProductFromCart(userId, productId);
  return cart;
};

export const getCartWithTotalPrice = (userId) => {
  const cart = cartRepository.getCart(userId);
  const totalPrice = cartRepository.getTotalPriceOfCart(userId);
  return { ...cart, totalPrice };
};
