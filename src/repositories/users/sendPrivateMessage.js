import { db } from "../../database/database.js";

export default async (from, to, message) => {
    try {
        await db.query(`
            INSERT INTO messages
            (sender_id, receiver_id, message)
            VALUES ($1, $2, $3)
        `, [from, to, message]);
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};