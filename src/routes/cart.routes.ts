import { Router } from "express";
import { currentUser } from "../middleware/currentUser";
import * as cartController from "../controllers/cart.controller";

const router = Router();

router.put("/:productId", currentUser, cartController.addProductToCart);

router.delete("/:productId", currentUser, cartController.removeProductFromCart);

router.post("/checkout", currentUser, cartController.getCartWithTotalPrice);

export default router;
