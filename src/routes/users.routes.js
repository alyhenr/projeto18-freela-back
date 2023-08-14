import { Router } from "express";

import { deleteService, getUserData, newContract, newMessage, newService } from "../controllers/users.controllers.js";

import schemaValidation from "../middlewares/schemaValidation.js";

import { newServiceSchema } from "../schemas/catalogSchemas.js";
import contractSchema from "../schemas/contractSchema.js";
import messageSchema from "../schemas/messageSchema.js";

//Authenticated routes
const usersRouter = Router();

//User add a new service to offer:
usersRouter.post("/new-service", schemaValidation(newServiceSchema), newService);
//User contract the service of another user:
usersRouter.post("/service/:id", schemaValidation(contractSchema), newContract);
//Private message:
usersRouter.post("/messages", schemaValidation(messageSchema), newMessage);
//Dashboard:
usersRouter.get("/dashboard", getUserData);
//Service provider deletes service:
usersRouter.delete("/delete-service/:id", deleteService)

export default usersRouter;