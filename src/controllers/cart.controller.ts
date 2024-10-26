import { NextFunction, Request, Response } from 'express';
import * as cartService from '../services/cart.service';
import { getUserId } from '../common/getUserId';

export const addProductToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    const productId = req.params.productId;
    const cart = await cartService.addProductToCart(userId, productId);
    res.status(200).json(cart);
  } catch (e) {
    next(e);
  }
};

export const removeProductFromCart = (req: Request, res: Response) => {
  const userId = getUserId(req);
  const productId = req.params.productId;
  const cart = cartService.removeProductFromCart(userId, productId);
  res.status(200).json(cart);
};

export const getCartWithTotalPrice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    const cartWithTotalPrice = await cartService.getCartWithTotalPrice(userId);
    res.status(200).json(cartWithTotalPrice);
  } catch (e) {
    next(e);
  }
};
