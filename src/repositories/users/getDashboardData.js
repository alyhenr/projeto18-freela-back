import { db } from "../../database/database.js";

export default async (id) => {
    try {
        const data = await db.query(`
            SELECT
                id, username, email, city, phone,
                (SELECT json_agg(c) FROM catalog c
                    WHERE c.user_id = u.id) AS catalog,
                (SELECT json_agg(m) FROM messages m
                    WHERE m.sender_id = u.id) AS messagesSent,
                (SELECT json_agg(m) FROM messages m
                    WHERE m.receiver_id = u.id) AS messagesReceived,
                (SELECT json_agg(contracts) FROM contracts contracts
                    WHERE contracts.provider_id = u.id) AS contractsProvider,
                (SELECT json_agg(contracts) FROM contracts contracts
                    WHERE contracts.client_id = u.id) AS contractsClient
            FROM users u
            WHERE u.id = $1;
        `, [id]);
        return data.rows[0];
    } catch (err) {
        throw new Error(err);
    }
};