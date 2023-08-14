import { db } from "../../database/database.js";

export const retrieveAllUsers = async () => {
    try {
        const response = await db.query(`
            SELECT id, username, city, phone, email
            FROM users;
        `);

        return response.rows;
    } catch (err) {
        throw new Error(err);
    }
};

export const retrieveUserData = async (id) => {
    try {
        const response = await db.query(`
            SELECT username, city, phone, email, description,
            c.* FROM users as u
            JOIN catalog AS c ON c.user_id=u.id
            WHERE u.id=$1
        `, [id]);
        return response.rows;
    } catch (err) {
        throw new Error(err);
    }
};