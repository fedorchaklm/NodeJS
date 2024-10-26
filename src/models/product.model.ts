import { randomUUID } from 'crypto';
import mongoose, { Model } from 'mongoose';
import { Product } from '../types/types';
const { Schema } = mongoose;

interface IProduct {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
}

interface IProductMethods {
  toClient(): Product;
}

export type IProductModel = Model<IProduct, {}, IProductMethods>;

export const productSchema = new Schema<IProduct, IProductModel, IProductMethods>(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return randomUUID();
      },
    },
    name: {
      type: String,
      max: [70, 'The name must be less 70 characters'],
      required: true,
    },
    description: {
      type: String,
      max: [256, 'The description must be less 256 characters'],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

productSchema.method('toClient', function (): Product {
  return {
    id: this._id,
    name: this.name,
    description: this.description,
    category: this.category,
    price: this.price,
  };
});

export default mongoose.model<IProduct, IProductModel>('Product', productSchema);
