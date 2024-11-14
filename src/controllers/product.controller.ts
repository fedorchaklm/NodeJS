import { Product } from 'src/types/types';
import * as productService from '../services/product.service';
import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../common/errors';

export const getAllProducts = async (_: Request, res: Response<Array<Product>>, next: NextFunction) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (e) {
    next(e);
  }
};

export const getProductById = async (req: Request, res: Response<Product>, next: NextFunction) => {
  try {
    const productId = req.params.productId;
    const product = await productService.getProductById(productId);
    if (product == null) {
      throw new NotFoundError('Product is not found');
    }
    res.status(200).json(product);
  } catch (e) {
    next(e);
  }
};

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productService.addProduct(req.body);
    res.status(200).json(product);
  } catch (e) {
    next(e);
  }
};

export const transformCsvToJson = (req: Request, res: Response) => {
  productService.transformCsvToJson(req, res);
};
