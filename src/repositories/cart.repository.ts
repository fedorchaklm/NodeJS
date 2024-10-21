import { carts } from "../storage";
import crypto from "crypto";
import { Cart, Product } from "../types/types";

export const getCart = (userId: string): Cart => {
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

export const updateCart = (userId: string, product: Product): Cart => {
  const cart = getCart(userId);
  cart.products.push(product);
  return cart;
};

export const deleteProductFromCart = (userId: string,  productId: number): Cart => {
  const cart = getCart(userId);
  const index = cart.products.findIndex(({ id }) => id === productId);
  cart.products.splice(index, 1);
  return cart;
};

export const getTotalPriceOfCart = (userId: string): number => {
  const cart = getCart(userId);
  const totalPrice = cart.products.reduce((acc, { price }) => acc + price, 0);
  return totalPrice;
};
