import * as productService from "../services/product.service.js";

export const getAllProducts = (_, res) => {
  const products = productService.getAllProducts();
  res.status(200).json(products);
};

export const getProductById = (req, res) => {
  const productId = Number(req.params.productId);
  const product = productService.getProductById(productId);
  res.status(200).json(product);
};

export const addProduct = (req, res) => {
  const product = productService.addProduct(req.body);
  res.status(200).json(product);
};

export const transformCsvToJson = (req, res) => {
  try {
    productService.transformCsvToJson(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};
