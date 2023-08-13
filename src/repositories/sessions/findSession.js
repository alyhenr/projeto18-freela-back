import { db } from "../../database/database.js";

export default async (refreshToken) => {
    try {
        const session = await db.query(`
            SELECT user_id FROM sessions
            WHERE refresh_token=$1;
        `, [refreshToken]);

        if (session.rowCount === 0) return { found: false };

        return { found: true, userId: session.rows[0].user_id };
    } catch (err) {
        throw new Error(err);
    }
};