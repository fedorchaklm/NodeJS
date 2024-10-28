import { NotFoundError } from '../common/errors';
import { Product } from '../types/types';
import ProductModel, { convert } from '../models/product.model';

export const getProducts = async (): Promise<Array<Product>> => {
  const products = await ProductModel.find();
  if (products === null) {
    return [];
  }
  return products.map(convert);
};

export const getProductById = async (productId: string): Promise<Product> => {
  const product = await ProductModel.findOne({_id: productId });
  if (!product) {
    throw new NotFoundError();
  }
  return convert(product);
};

export const addProduct = async (product: Product): Promise<Product> => {
  const { id, ...rest } = product;
  const newProduct = new ProductModel({ _id: id, ...rest });
  await newProduct.save();
  return product;
};

export const addManyProducts = async (products: Array<Product>): Promise<Array<Product>> => {
  await ProductModel.insertMany(products.map(({ id, ...rest }) => ({ _id: id, ...rest })));
  return products;
};
