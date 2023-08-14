import { db } from "../../database/database.js";

export default async ({ userId, refreshToken }) => {
    try {
        await db.query(`
            INSERT INTO sessions
            (user_id, refresh_token)
            VALUES ($1, $2);
        `, [userId, refreshToken]);
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};