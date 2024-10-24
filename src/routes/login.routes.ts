import {Router} from "express";
import * as loginController from "../controllers/login.controller";

const router = Router();

router.post("/", loginController.login);

export default router;
