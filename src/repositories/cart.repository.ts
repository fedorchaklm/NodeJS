import { Cart } from '../types/types';
import { CartModel, convert } from '../models/cart.model';

export const getCart = async (userId: string): Promise<Cart> => {
  let cart = await CartModel.findOne({ user: userId }).populate(['user', 'products']);
  if (cart == null) {
    const newCart = await new CartModel({
      user: userId,
      products: [],
    }).save();
    cart = await newCart.populate(['user', 'products']);
  }
  return convert(cart);
};

export const updateCart = async (cart: Cart): Promise<Cart | null> => {
  const products = cart.products.map(({ id }) => id);
  const updatedCart = await CartModel.findOneAndUpdate(
    { _id: cart.id },
    {
      user: cart.user.id,
      products,
    }
  ).populate(['user', 'products']);

  if (updatedCart == null) {
    return null;
  }

  return convert(updatedCart);
};
