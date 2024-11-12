import * as productRepository from '../repositories/product.repository';
import eventEmitter from '../common/eventEmitter';
import csv from 'csv-parser';
import { Request, Response } from 'express';
import { CreateProduct, Product } from '../types/types';
import { NotFoundError } from '../common/errors';

export const getAllProducts = (): Promise<Array<Product>> => {
  return productRepository.getProducts();
};

export const getProductById = (productId: string): Promise<Product | null> => {
  const product = productRepository.getProductById(productId);
  if (!product) {
    throw new NotFoundError();
  }
  return product;
};

export const addProduct = async ({ name, description, category, price }: CreateProduct): Promise<Product> => {
  const newProduct = { name, description, category, price };
  return productRepository.addProduct(newProduct);
};

export const transformCsvToJson = (req: Request, res: Response) => {
  eventEmitter.emit('fileUploadStart');

  let batch: Array<Product | CreateProduct> = [];
  const batchSize = 100;

  req
    .pipe(csv())
    .on('data', async (data) => {
      batch.push({
        name: data.name,
        description: data.description,
        category: data.category,
        price: Number(data.price),
      });
      if (batch.length === batchSize) {
        await productRepository.addManyProducts(batch.splice(0));
      }
    })
    .on('error', () => {
      eventEmitter.emit('fileUploadFailed');
    })
    .on('end', async () => {
      await productRepository.addManyProducts(batch.splice(0));
      eventEmitter.emit('fileUploadEnd');
      res.status(200).send('File has been uploaded successfully!');
    });
};
