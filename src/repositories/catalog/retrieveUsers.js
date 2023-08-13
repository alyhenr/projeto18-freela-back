import { db } from "../../database/database.js";

export const retrieveAllUsers = async () => {
    const response = await db.query(`
        SELECT id, username, city, phone
        FROM users;
    `);

    return response.rows;
};