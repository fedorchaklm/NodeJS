// import { carts } from '../storage';
import crypto from 'crypto';
import { Cart, Product } from '../types/types';
import CartModel, { convert, ICart } from '../models/cart.model';
import { HttpError, NotFoundError } from '../common/errors';

export const getCart = async (userId: string): Promise<Cart> => {
  let cart = await CartModel.findOne({ userId }).populate('products');

  if (cart === null) {
    cart = new CartModel({
      _id: crypto.randomUUID(),
      userId,
      products: [],
    });
    await cart.save();
  }

  return convert(cart);
};

export const updateCart = async (cart: Cart): Promise<Cart> => {
  const products = cart.products.map(({ id }) => id);
  const updatedCart = await CartModel.findOneAndUpdate({ _id: cart.id }, {
    userId: cart.userId,
    products,
  }).populate('products');

  if (updatedCart == null) {
    throw new HttpError(404, 'Cart not found');
  }

  return convert(updatedCart);
}



export const deleteProductFromCart = async (userId: string, productId: string): Promise<Cart> => {
  const updatedCart = await CartModel.findOne({ userId }).populate('products');
  // const productIndex = cart?.products.findIndex((product) => product === productId);
  // cart?.products.splice(productIndex, 1);
  const cart2 = getCart(userId);
  // const index = cart.products.findIndex(({ id }) => id === productId);
  // cart.products.splice(index, 1);
  return cart2;
};

// export const getTotalPriceOfCart = (userId: string): number => {
//   const cart = getCart(userId);
//   // const totalPrice = cart.products.reduce((acc, { price }) => acc + price, 0);
//   const totalPrice = 1;
//   return totalPrice;
// };
