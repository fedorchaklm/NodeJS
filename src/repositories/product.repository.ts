import { products } from "../storage";
import { NotFoundError } from "../common/errors";
import { Product } from "../types/types";

export const getProducts = (): Array<Product> => {
  return products;
};

export const getProductById = (productId: number): Product => {
  const product = products.find(({ id }) => id === productId);
  if (!product) {
    throw new NotFoundError();
  }
  return product;
};
