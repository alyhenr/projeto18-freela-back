import createNewService from "../repositories/catalog/createNewService.js";

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

export const newContract = (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
};