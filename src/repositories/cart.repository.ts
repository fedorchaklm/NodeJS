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

export const updateCart = async (userId: string, productId: string): Promise<Cart> => {
  const a = await CartModel.findOneAndUpdate({ userId }, { $push: { products: productId } }, { new: true }).populate('products');
  await a?.save();
  console.log(a);
  const currentCart = await getCart(userId);
  console.log(currentCart);
  return currentCart;
};

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
