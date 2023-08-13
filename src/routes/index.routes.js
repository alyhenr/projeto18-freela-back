import { Router } from "express";

import authRouter from "./auth.routes.js";
import usersRouter from "./users.routes.js";
import catalogRouter from "./catalog.routes.js";

//Verify access token
import verifyJWT from "../middlewares/verifyJWT.js";

const router = Router();

router.use(authRouter);
router.use(catalogRouter);


//Authenticated Routes
router.use(verifyJWT);
router.use(usersRouter);

export default router;