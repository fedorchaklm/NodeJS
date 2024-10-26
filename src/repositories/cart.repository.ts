// import { carts } from '../storage';
import crypto from 'crypto';
import { Cart, Product } from '../types/types';
import CartModel from '../models/cart.model';
import { NotFoundError } from '../common/errors';

export const getCart = async (userId: string): Promise<Cart> => {
  // let cart = carts.find((cart) => cart.userId === userId);
  let cart = await CartModel.findOne({ userId }).populate('products');

  console.log('> 1', cart);

  if (cart === null) {
    cart = new CartModel({
      _id: crypto.randomUUID(),
      userId,
      products: [],
    });
    await cart.save();
  }

  console.log('> cart', cart);

  return cart.toClient();
  // const { _id, products, ...rest} = cart.toObject();
  // const products = rest.products(())
  // return {id: _id, products,...rest};
};

export const updateCart = async (userId: string, product: Product): Promise<Cart> => {
  const cart = await getCart(userId);
  // cart.products.push(product);
  return cart;
};

export const deleteProductFromCart = (userId: string, productId: string): Promise<Cart> => {
  const cart = getCart(userId);
  // const index = cart.products.findIndex(({ id }) => id === productId);
  // cart.products.splice(index, 1);
  return cart;
};

// export const getTotalPriceOfCart = (userId: string): number => {
//   const cart = getCart(userId);
//   // const totalPrice = cart.products.reduce((acc, { price }) => acc + price, 0);
//   const totalPrice = 1;
//   return totalPrice;
// };
