import { Router } from "express";

import { getServices, getUsers } from "../controllers/catalog.controllers.js";

const catalogRouter = Router();

catalogRouter.get("/explore", getServices);
catalogRouter.get("/samurais", getUsers);

export default catalogRouter;