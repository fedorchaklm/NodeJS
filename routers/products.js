import express from "express";
import { products } from "../storage.js";

const router = express.Router();

router.get("/", (_, res) => {
  res.status(200).json(products);
});

router.get("/:productId", (req, res) => {
  const productId = Number(req.params.productId);
  const product = products.find(({ id }) => id === productId);
  if (!product) {
    return res.status(404).send("Product not found");
  }
  res.status(200).json(product);
});

export default router;
