import { db } from "../../database/database.js";

export default async (serviceId, userId) => {
    try {
        const response = await db.query(`
            DELETE FROM catalog
            WHERE id=$1 AND user_id=$2
            RETURNING catalog.user_id
        `, [serviceId, userId]);

        if (response.rowCount === 0) return { notProvider: true }
        return { notProvider: false };
    } catch (err) {
        throw new Error(err);
    }
};