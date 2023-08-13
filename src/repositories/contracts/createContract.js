import { db } from "../../database/database.js";
import calcDueDate from "../../helpers/calcDueDate.js";

export const getProviderId = async (serviceId) => {
    return (await db.query(`
        SELECT user_id FROM catalog
        WHERE id = $1;
    `, [serviceId])).rows[0].user_id;
};

export default async (
    serviceId, clientId, totalPrice, requirements, duration
) => {
    try {
        const providerId = await getProviderId(serviceId);

        if (providerId === clientId) {
            throw new Error("Same user");
        }

        const dueDate = calcDueDate(duration);
        await db.query(`
                INSERT INTO contracts
                (service_id, client_id, provider_id,
                total_price, requirements, due_date)
                VALUES ($1, $2, $3, $4, $5, $6)
            `, [serviceId, clientId, providerId, totalPrice, requirements, dueDate]);
    } catch (err) {
        throw new Error(err);
    }
};