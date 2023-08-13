import { Router } from "express";

import { newContract, newService } from "../controllers/users.controllers.js";

import schemaValidation from "../middlewares/schemaValidation.js";

import { newServiceSchema } from "../schemas/catalogSchemas.js";
import contractSchema from "../schemas/contractSchema.js";

//Authenticated routes
const usersRouter = Router();

//User add a new service to offer:
usersRouter.post("/new-service", schemaValidation(newServiceSchema), newService);
//User contract the service of another user:
usersRouter.post("/service/:id", schemaValidation(contractSchema), newContract);

export default usersRouter;