import * as productRepository from '../repositories/product.repository';
import eventEmitter from '../common/eventEmitter';
import csv from 'csv-parser';
import { Request, Response } from 'express';
import { Product } from '../types/types';

export const getAllProducts = (): Promise<Array<Product>> => {
  return productRepository.getProducts();
};

export const getProductById = (productId: string): Promise<Product> => {
  const product = productRepository.getProductById(productId);
  return product;
};

export const addProduct = async ({ name, description, category, price }: Product): Promise<Product> => {
  const newProduct = { name, description, category, price };
  const product = await productRepository.addProduct(newProduct);
  return product;
};

export const transformCsvToJson = (req: Request, res: Response) => {
  eventEmitter.emit('fileUploadStart');

  let batch: Array<Product> = [];
  const batchSize = 100;

  req
    .pipe(csv())
    .on('data', async (data) => {
      batch.push({
        name: data.name,
        description: data.description,
        category: data.category,
        price: Number(data.price)
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
