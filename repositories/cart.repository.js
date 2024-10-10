import { carts } from "../storage.js";
import crypto from "crypto";

export const getCart = (userId) => {
  let cart = carts.find((cart) => cart.userId === userId);

  if (!cart) {
    cart = {
      id: crypto.randomUUID(),
      userId,
      products: [],
    };
    carts.push(cart);
  }

  return cart;
};

export const updateCart = (userId, product) => {
  const cart = getCart(userId);
  cart.products.push(product);
  return cart;
};

export const deleteProductFromCart = (userId, productId) => {
  const cart = getCart(userId);
  const index = cart.products.findIndex(({ id }) => id === productId);
  cart.products.splice(index, 1);
  return cart;
};

export const getTotalPriceOfCart = (userId) => {
  const cart = getCart(userId);
  const totalPrice = cart.products.reduce((acc, { price }) => acc + price, 0);
  return totalPrice;
};
