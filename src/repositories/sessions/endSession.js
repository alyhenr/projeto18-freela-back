import { db } from "../../database/database.js";

export default async (refreshToken) => {
    try {
        await db.query(`
            DELETE FROM sessions
            WHERE refresh_token=$1;
        `, [refreshToken]);
    } catch (err) {
        throw new Error(err);
    }
};