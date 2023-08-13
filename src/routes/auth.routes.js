import { Router } from "express";

import { signInSchema, signUpSchema } from "../schemas/authSchemas.js";
import { signUp, signIn, refreshToken } from "../controllers/auth.controllers.js";
import schemaValidation from "../middlewares/schemaValidation.js"

const authRouter = Router();

authRouter.post("/signup", schemaValidation(signUpSchema), signUp);
authRouter.post("/signin", schemaValidation(signInSchema), signIn);
authRouter.get("/refresh", refreshToken);

export default authRouter;
