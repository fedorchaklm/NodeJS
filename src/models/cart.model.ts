import mongoose, { Model, Types } from 'mongoose';
import { IProduct, productSchema } from './product.model';
import { randomUUID } from 'crypto';
import { Cart } from '../types/types';
import { convert as convertProduct } from './product.model';
import { IUser, convert as convertUser } from './user.model';
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
      default: function genUUID() {
        return randomUUID();
      },
    },
    user: {
      type: String,
      ref: 'User',
    },
    products: [{ type: String, ref: 'Product' }],
  },
  { versionKey: false }
);

export const convert = (cart: ICart): Cart => ({
  id: cart._id,
  user: convertUser(cart.user),
  products: cart.products.map(convertProduct),
});

export default mongoose.model('Cart', cartSchema);
