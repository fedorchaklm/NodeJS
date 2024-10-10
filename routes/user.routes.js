import {Router} from "express";
import { validateRegisterData } from "../middleware/validate.js";
import * as userController from "../controllers/user.contoroller.js";

const router = Router();

router.post("/", validateRegisterData, userController.signUp);

export default router;
