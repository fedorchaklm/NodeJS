import crypto from 'crypto';
import { Cart } from '../types/types';
import CartModel, { convert } from '../models/cart.model';
import { HttpError } from '../common/errors';
import { UserModel } from '../models/user.model';
import * as userRepository from './user.repository';

export const getCart = async (userId: string): Promise<Cart> => {
  let cart = await CartModel.findOne({ user: userId }).populate(['user', 'products']);

  if (cart == null) {
    const newCart = await new CartModel({
      _id: crypto.randomUUID(),
      user: userId,
      products: [],
    }).save();
    cart = await newCart.populate(['user', 'products']);
  }

  return convert(cart);
};

export const updateCart = async (cart: Cart): Promise<Cart> => {
  const products = cart.products.map(({ id }) => id);
  const updatedCart = await CartModel.findOneAndUpdate(
    { _id: cart.id },
    {
      user: cart.user.id,
      products,
    }
  ).populate('products');

  if (updatedCart == null) {
    throw new HttpError(404, 'Cart not found');
  }

  console.log(updateCart);
  return convert(updatedCart);
};

// export const getTotalPriceOfCart = async (cart: Cart) => {
//   try {
//     const result = await CartModel.aggregate([
//       // Step 1: Filter orders where amount is greater than 200
//       {
//         $match: { _id: cart.id },
//       },
//       // Group by customerId and sum the amount for each customer
//       {
//         $group: {
//           _id: '$_id',
//           totalPrice: { $sum: '$price' },
//         },
//       },
//     ]);
//     console.log('Total price:', result);
//   } catch (err) {
//     console.error('Error during aggregation:', err);
//   }
// };
