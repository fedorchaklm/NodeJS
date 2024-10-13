import * as productRepository from "../repositories/product.repository";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { randomUUID } from "crypto";
import eventEmitter from "../common/eventEmitter";
import csv from "csv-parser";
import { Request, Response } from "express";
import { Product, ProductCsv } from "../types/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsStoreFilePath = path.join(__dirname, "..", "products.store.json");

export const getAllProducts = (): Array<Product> => {
  const products = productRepository.getProducts();
  return products;
};

export const getProductById = (productId: number): Product => {
  const product = productRepository.getProductById(productId);
  return product;
};

export const addProduct = ({
  name,
  description,
  category,
  price,
}: ProductCsv): ProductCsv => {
  const product = { id: randomUUID(), name, description, category, price };
  const data = fs.readFileSync(productsStoreFilePath, "utf-8");
  const parsedData = JSON.parse(data === "" ? "[]" : data);
  parsedData.push(product);
  fs.writeFileSync(productsStoreFilePath, `${JSON.stringify(parsedData)}`);
  return product;
};

export const transformCsvToJson = (req: Request, res: Response) => {
  let result: { error?: Error; code: number; message?: string };

  const writableStream = fs.createWriteStream(productsStoreFilePath);

  writableStream.on("close", () => {
    if (result.error) {
      eventEmitter.emit("fileUploadFailed", result.error);
      res.status(result.code).send(result.error.message);
      return;
    }
    eventEmitter.emit("fileUploadEnd");
    res.status(result.code).send(result.message);
  });

  let lastItem: string | null = null;

  eventEmitter.emit("fileUploadStart");

  req
    .pipe(csv())
    .on("data", (data) => {
      writableStream.write(
        lastItem == null ? "[" : `${JSON.stringify(lastItem)},`
      );
      lastItem = data;
    })
    .on("end", () => {
      if (lastItem == null) {
        result = { code: 400, error: Error("File wasn't provided") };
      } else {
        writableStream.write(`${JSON.stringify(lastItem)}]`);
        result = { code: 200, message: "File has been uploaded successfully!" };
      }
      writableStream.close();
    });
};
