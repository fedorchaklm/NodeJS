import mongoose, { Model, Types } from 'mongoose';
import ProductModel, { IProductModel, productSchema } from './product.model';
import { randomUUID } from 'crypto';
import { Cart } from '../types/types';
const { Schema } = mongoose;

interface ICart {
  _id: string;
  userId: string;
  products: Array<IProductModel>;
}

interface ICartMethods {
  toClient(): Cart;
}

type CartModel = Model<ICart, {}, ICartMethods>;

const cartSchema = new Schema({
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
  products: [{ type: Types.ObjectId, ref: 'Product' }]
}, { versionKey: false });

cartSchema.method('toClient', function (): Cart {
  return {
    id: this._id,
    userId: this.userId,
    products: [],
  };
});

export default mongoose.model<ICart, CartModel>('Cart', cartSchema);
