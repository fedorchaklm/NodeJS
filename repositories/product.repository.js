import { products } from "../storage.js";
import { NotFoundError } from "../common/errors.js";

export const getProducts = () => {
  return products;
};

export const getProductById = (productId) => {
  const product = products.find(({ id }) => id === productId);
  if (!product) {
    throw new NotFoundError();
  }
  return product;
};
