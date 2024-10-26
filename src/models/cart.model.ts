import mongoose, { Model, Types } from 'mongoose';
import { IProduct, productSchema } from './product.model';
import { randomUUID } from 'crypto';
import { Cart } from '../types/types';
import { convert as convertProduct } from './product.model';
const { Schema } = mongoose;
export interface ICart {
  _id: string;
  userId: string;
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
    userId: {
      type: String,
      required: true,
    },
    products: [{ type: String, ref: 'Product' }],
  },
  { versionKey: false }
);

export const convert = (cart: ICart): Cart => ({
  id: cart._id,
  userId: cart.userId,
  products: cart.products.map(convertProduct),
});

export default mongoose.model('Cart', cartSchema);
