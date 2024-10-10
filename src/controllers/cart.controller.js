import * as cartService from "../services/cart.service.js";

export const addProductToCart = (req, res) => {
  const { userId } = req;
  const productId = Number(req.params.productId);
  const cart = cartService.addProductToCart(userId, productId);
  res.status(200).json(cart);
};

export const removeProductFromCart = (req, res) => {
  const { userId } = req;
  const productId = Number(req.params.productId);
  const cart = cartService.removeProductFromCart(userId, productId);
  res.status(200).json(cart);
};

export const getCartWithTotalPrice = (req, res) => {
  const { userId } = req;
  const cartWithTotalPrice = cartService.getCartWithTotalPrice(userId);
  res.status(200).json(cartWithTotalPrice);
};
