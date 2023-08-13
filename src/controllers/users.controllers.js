import createNewService from "../repositories/catalog/createNewService.js";
import createContract, { getProviderId } from "../repositories/contracts/createContract.js";
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
        console.log(err.message);
        if (err.message === "Error: Same user") {
            res.status(409).send(
                { message: "Not allowed to make auto contracts" }
            )
        } else {
            res.sendStatus(500);
        }
    }
};