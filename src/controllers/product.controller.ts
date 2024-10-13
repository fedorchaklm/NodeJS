import * as productService from "../services/product.service";
import { Request, Response } from "express";

export const getAllProducts = (_: Request, res: Response) => {
  const products = productService.getAllProducts();
  res.status(200).json(products);
};

export const getProductById = (req: Request, res: Response) => {
  const productId = Number(req.params.productId);
  const product = productService.getProductById(productId);
  res.status(200).json(product);
};

export const addProduct = (req: Request, res: Response) => {
  const product = productService.addProduct(req.body);
  res.status(200).json(product);
};

export const transformCsvToJson = (req: Request, res: Response) => {
  productService.transformCsvToJson(req, res);
};
