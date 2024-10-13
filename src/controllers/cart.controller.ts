import { Request, Response } from "express";
import * as cartService from "../services/cart.service";
import { getUserId } from "../common/getUserId";

export const addProductToCart = (req: Request, res: Response) => {
  const userId = getUserId(req);
  const productId = Number(req.params.productId);
  const cart = cartService.addProductToCart(userId, productId);
  res.status(200).json(cart);
};

export const removeProductFromCart = (req: Request, res: Response) => {
  const userId = getUserId(req);
  const productId = Number(req.params.productId);
  const cart = cartService.removeProductFromCart(userId, productId);
  res.status(200).json(cart);
};

export const getCartWithTotalPrice = (req: Request, res: Response) => {
  const userId = getUserId(req);
  const cartWithTotalPrice = cartService.getCartWithTotalPrice(userId);
  res.status(200).json(cartWithTotalPrice);
};
