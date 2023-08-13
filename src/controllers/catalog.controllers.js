import { retrieveAllServices } from "../repositories/catalog/retrieveServices.js";
import { retrieveAllUsers } from "../repositories/catalog/retrieveUsers.js";

export const getServices = async (req, res) => {
    try {
        const response = await retrieveAllServices();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

export const getUsers = async (req, res) => {
    try {
        const response = await retrieveAllUsers();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}