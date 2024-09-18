import express from "express";
import { products, getCart } from "../storage.js";
import { USER_ID_HEADER } from "../constants.js";

const router = express.Router();

router.put("/:productId", (req, res) => {
  const userId = req.headers[USER_ID_HEADER];
  const productId = Number(req.params.productId);

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  const product = products.find(({ id }) => id === productId);

  if (!product) {
    return res.status(404).send("Product not found");
  }

  const cart = getCart(userId);
  cart.products.push(product);
  res.status(200).json(cart);
});

router.delete("/:productId", (req, res) => {
  const userId = req.headers[USER_ID_HEADER];
  const productId = Number(req.params.productId);
  if (!userId) {
    return res.status(401).send("Unauthorized");
  }
  const cart = getCart(userId);
  const index = cart.products.findIndex(({ id }) => id === productId);
  cart.products.splice(index, 1);
  res.status(200).json(cart);
});

router.post("/checkout", (req, res) => {
  const userId = req.headers[USER_ID_HEADER];
  if (!userId) {
    return res.status(401).send("Unauthorized");
  }
  const cart = getCart(userId);
  const totalPrice = cart.products.reduce((acc, { price }) => acc + price, 0);
  res.status(200).json({ ...cart, totalPrice });
});

export default router;
