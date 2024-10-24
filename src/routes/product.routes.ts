import { Router } from "express";
import * as productController from "../controllers/product.controller";
import { checkPermissions } from "../middleware/checkPermissions";
import { auth } from "../middleware/auth";
import { APP_ROLES } from "../types/types";

const router = Router();

router.get("/", productController.getAllProducts);

router.get("/:productId", productController.getProductById);

router.post("/", auth, checkPermissions([APP_ROLES.Admin]), productController.addProduct);

router.post("/import", auth, checkPermissions([APP_ROLES.Admin]), productController.transformCsvToJson);

export default router;
