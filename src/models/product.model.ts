import { randomUUID } from 'crypto';
import mongoose from 'mongoose';
import { Product } from '../types/types';
const { Schema } = mongoose;

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
}

export const productSchema = new Schema<IProduct>(
  {
    _id: {
      type: String,
      default: randomUUID,
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

export const convert = (product: IProduct): Product => ({
  id: product._id,
  name: product.name,
  description: product.description,
  category: product.category,
  price: product.price,
});

export const ProductModel = mongoose.model('Product', productSchema);
