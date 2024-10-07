import express from "express";
import { products } from "../storage.js";
import { NotFoundError } from "../common/errors.js";
import fs from "fs";
import { randomUUID } from "crypto";
import csv from "csv-parser";
import { fileURLToPath } from "url";
import path from "path";
import eventEmitter from "../common/eventEmitter.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsStoreFilePath = path.join(__dirname, "..", "products.store.json");

router.get("/", (_, res) => {
  res.status(200).json(products);
});

router.get("/:productId", (req, res) => {
  const productId = Number(req.params.productId);
  const product = products.find(({ id }) => id === productId);
  if (!product) {
    throw new NotFoundError();
  }
  res.status(200).json(product);
});

router.post("/", (req, res) => {
  const { name, description, category, price } = req.body;
  const product = { id: randomUUID(), name, description, category, price };
  try {
    const data = fs.readFileSync(productsStoreFilePath, "utf-8");
    const parsedData = JSON.parse(data === "" ? [] : data);
    parsedData.push(product);
    fs.writeFileSync(productsStoreFilePath, `${JSON.stringify(parsedData)}`);
  } catch (err) {
    throw new Error(err.message);
  }
  res.status(200).json(product);
});

router.post("/import", (req, res) => {
  let result = {};

  const writableStream = fs.createWriteStream(productsStoreFilePath);

  writableStream.on("close", () => {
    if (result.error) {
      eventEmitter.emit("fileUploadFailed", result.error);
      return res.status(result.code).send(result.error.message);
    }
    eventEmitter.emit("fileUploadEnd");
    res.status(result.code).send(result.message);
  });

  let lastItem = null;

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
});
export default router;
