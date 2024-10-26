import * as productRepository from '../repositories/product.repository';
import * as cartRepository from '../repositories/cart.repository';
// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import path from 'path';
import { randomUUID } from 'crypto';
import eventEmitter from '../common/eventEmitter';
import csv from 'csv-parser';
import { Request, Response } from 'express';
import { Product } from '../types/types';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const productsStoreFilePath = path.join(__dirname, '..', 'products.store.json');

export const getAllProducts = (): Promise<Array<Product>> => {
  return productRepository.getProducts();
};

export const getProductById = (productId: string): Promise<Product> => {
  const product = productRepository.getProductById(productId);
  return product;
};

export const addProduct = async ({ name, description, category, price }: Product): Promise<Product> => {
  const newProduct = { id: randomUUID(), name, description, category, price };
  const product = await productRepository.addProduct(newProduct);
  // const cart = await cartRepository.getCart(userId)
  return product;
};

export const transformCsvToJson = (req: Request, res: Response) => {
  eventEmitter.emit('fileUploadStart');

  let batch: Array<Product> = [];
  const batchSize = 5;

  req
    .pipe(csv())
    .on('data', async (data) => {
      batch.push({
        id: randomUUID(),
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
