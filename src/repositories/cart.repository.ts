import crypto from 'crypto';
import { Cart } from '../types/types';
import CartModel, { convert } from '../models/cart.model';
import { HttpError } from '../common/errors';

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
  const updatedCart = await CartModel.findOneAndUpdate(
    { _id: cart.id },
    {
      userId: cart.userId,
      products,
    }
  ).populate('products');

  if (updatedCart == null) {
    throw new HttpError(404, 'Cart not found');
  }

  console.log(updateCart);
  return convert(updatedCart);
};

// export const getTotalPriceOfCart = async (cart: Cart): Promise<number> => {
//   // const cart = await getCart(userId);
//   const totalPrice = cart.products.reduce((acc, { price }) => acc + price, 0);
//   return totalPrice;
// };

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
