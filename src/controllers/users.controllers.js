import createNewService from "../repositories/catalog/createNewService.js";
import handleDeleteService from "../repositories/catalog/handleDeleteService.js";

import createContract, { getProviderId } from "../repositories/contracts/createContract.js";

import endSession from "../repositories/sessions/endSession.js";
import findSession from "../repositories/sessions/findSession.js";

import getDashboardData from "../repositories/users/getDashboardData.js";
import sendPrivateMessage from "../repositories/users/sendPrivateMessage.js";

export const newService = async (req, res) => {
    const data = req.body;
    const userId = req.userId;
    try {
        const response = await createNewService({ userId, ...data });

        if (!response.created) return res.status(response.status).send(response.message);

        return res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const newContract = async (req, res) => {
    //We can get the service provider with it
    const serviceId = req.params.id;
    //The user requesting the service
    const clientId = req.userId;

    const {
        requirements, totalPrice, duration, ...details
    } = req.body;

    try {
        await createContract(serviceId, clientId, totalPrice, requirements, duration);

        if (details.message) {
            const providerId = await getProviderId(serviceId);
            await sendPrivateMessage(
                clientId,
                providerId,
                details.message
            );
        }

        res.sendStatus(201);
    } catch (err) {
        if (err.message === "Error: Same user") {
            res.status(409).send(
                { message: "Not allowed to make auto contracts" }
            )
        } else {
            console.log(err);
            res.sendStatus(500);
        }
    }
};

export const newMessage = async (req, res) => {
    const { senderId, receiverId, message } = req.body;

    try {
        await sendPrivateMessage(senderId, receiverId, message);

        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

export const getUserData = async (req, res) => {
    const { id } = req.headers;
    if (!id) return res.sendStatus(404);
    try {
        const response = await getDashboardData(id);
        res.send(response);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

export const deleteService = async (req, res) => {
    const serviceId = req.params?.id;
    const userId = req.headers?.userid;
    if (serviceId && userId) {
        try {
            const response = await handleDeleteService(serviceId, userId);
            if (response.notProvider) return res.status(401).send({
                message: "You cannot delete other user's services!"
            });
            res.sendStatus(204);
        } catch (err) {
            if (err.message.includes(
                'update or delete on table "catalog" violates foreign key constraint "contracts_service_id_fkey" on table "contracts"'
            )) {
                return res.status(403).send({
                    message: "It's not possible to delete a service in which you have an active contract! Finish the job than delete it."

                });
            }
            res.sendStatus(500);
        }
    }
}