import {Router} from "express";
import { validateRegisterData } from "../middleware/validate";
import * as userController from "../controllers/user.contoroller";

const router = Router();

router.post("/", validateRegisterData, userController.signUp);

export default router;
