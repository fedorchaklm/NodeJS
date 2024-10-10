import { Router } from "express";
import * as productController from "../controllers/product.controller";

const router = Router();

router.get("/", productController.getAllProducts);

router.get("/:productId", productController.getProductById);

router.post("/", productController.addProduct);

router.post("/import", productController.transformCsvToJson);

export default router;
