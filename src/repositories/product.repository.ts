import { NotFoundError } from '../common/errors';
import { CreateProduct, Product } from '../types/types';
import {ProductModel, convert } from '../models/product.model';

export const getProducts = async (): Promise<Array<Product>> => {
  const products = await ProductModel.find();
  if (products === null) {
    return [];
  }
  return products.map(convert);
};

export const getProductById = async (productId: string): Promise<Product | null> => {
  const product = await ProductModel.findOne({_id: productId });
  if (!product) {
    return null;
  }
  return convert(product);
};

export const addProduct = async (product: CreateProduct): Promise<Product> => {
  const { id, ...rest } = product;
  const newProduct = new ProductModel({ _id: id, ...rest });
  await newProduct.save();
  return convert(newProduct);
};

export const addManyProducts = async (products: Array<CreateProduct>): Promise<Array<Product>> => {
  const res = await ProductModel.insertMany(products.map(({ id, ...rest }) => ({ _id: id, ...rest })));
  return res.map(convert);
};
