import { Router } from "express";

import * as authController from "../controllers/auth.js";

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from "../utils/validateBody.js";

import { authRegisterSchema, authLoginSchema } from "../validation/auth.js";

const authRouter = Router();

authRouter.post('/auth/register', validateBody(authRegisterSchema),ctrlWrapper(authController.registerController));

authRouter.post('/auth/login', validateBody(authLoginSchema), ctrlWrapper(authController.loginController));

export default authRouter;