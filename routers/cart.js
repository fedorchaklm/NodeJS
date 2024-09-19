import express from "express";
import { products, getCart } from "../storage.js";
import { currentUser } from "../middleware/currentUser.js";

const router = express.Router();

router.put("/:productId", currentUser, (req, res) => {
  const { userId } = req;
  const productId = Number(req.params.productId);
  const product = products.find(({ id }) => id === productId);
  if (!product) {
    return res.status(404).send("Product not found");
  }
  const cart = getCart(userId);
  cart.products.push(product);
  res.status(200).json(cart);
});

router.delete("/:productId", currentUser, (req, res) => {
  const { userId } = req;
  const productId = Number(req.params.productId);
  const cart = getCart(userId);
  const index = cart.products.findIndex(({ id }) => id === productId);
  cart.products.splice(index, 1);
  res.status(200).json(cart);
});

router.post("/checkout", currentUser, (req, res) => {
  const { userId } = req;
  const cart = getCart(userId);
  const totalPrice = cart.products.reduce((acc, { price }) => acc + price, 0);
  res.status(200).json({ ...cart, totalPrice });
});

export default router;
