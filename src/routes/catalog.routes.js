import { Router } from "express";

import { getServices, getUser, getUsers } from "../controllers/catalog.controllers.js";

const catalogRouter = Router();

catalogRouter.get("/explore", getServices);
catalogRouter.get("/samurais", getUsers);
catalogRouter.get("/samurai/:id", getUser);

export default catalogRouter;