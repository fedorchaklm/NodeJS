import {Router} from "express";
import * as loginController from "../controllers/login.controller";

const router = Router();

router.post("/", loginController.login);
/**
 * @swagger
 * /api/register:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
export default router;
