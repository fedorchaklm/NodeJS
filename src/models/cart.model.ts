import mongoose from 'mongoose';
import { IProduct } from './product.model';
import { randomUUID } from 'crypto';
import { Cart } from '../types/types';
import { convert as convertProduct } from './product.model';
import { IUser } from './user.model';

const { Schema } = mongoose;
export interface ICart {
  _id: string;
  user: IUser;
  products: Array<IProduct>;
}

const cartSchema = new Schema<ICart>(
  {
    _id: {
      type: String,
      default: randomUUID,
    },
    user: {
      type: String,
      ref: 'User',
    },
    products: [{ type: String, ref: 'Product' }],
  },
  { versionKey: false }
);

export const convert = (cart: ICart): Cart => {
  return {
    id: cart._id,
    user: {
      id: cart.user._id,
      email: cart.user.email,
      name: cart.user.name,
    },
    products: cart.products.map(convertProduct),
  };
};

export const CartModel = mongoose.model('Cart', cartSchema);
