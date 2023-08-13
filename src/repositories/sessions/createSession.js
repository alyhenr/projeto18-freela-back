import { db } from "../../database/database.js";

export default async ({ userId, refreshToken, accessToken }) => {
    try {
        await db.query(`
            INSERT INTO sessions
            (user_id, refresh_token, access_token)
            VALUES ($1, $2, $3);
        `, [userId, refreshToken, accessToken]);
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};