import { retrieveAllServices } from "../repositories/catalog/retrieveServices.js";
import { retrieveAllUsers } from "../repositories/catalog/retrieveUsers.js";
import { getUserActiveContracts } from "../repositories/contracts/retrieveContracts.js";

export const getServices = async (req, res) => {
    let loggedIn = false;
    const userId = req.headers['userid'];

    if (userId) {
        loggedIn = true;
    }

    try {
        //Object
        const response = await retrieveAllServices();

        if (loggedIn) {
            const userContracts = await getUserActiveContracts(userId);
            response.userContracts = userContracts;
        }

        res.status(200).send(response);
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