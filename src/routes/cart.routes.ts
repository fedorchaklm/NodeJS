import { Router } from "express";
import * as cartController from "../controllers/cart.controller";
import { auth } from "../middleware/auth";

const router = Router();

router.put("/:productId", auth, cartController.addProductToCart);

router.delete("/:productId", auth, cartController.removeProductFromCart);

router.post("/checkout", auth, cartController.getCartWithTotalPrice);

export default router;
