import { db } from "../../database/database.js";

export const getUserActiveContracts = async (userId) => {
    return (await db.query(`
        SELECT * from contracts
        WHERE client_id = $1 AND active = TRUE;
    `, [userId])).rows;
};