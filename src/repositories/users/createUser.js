import { db } from "../../database/database.js";
import bcrypt from "bcrypt";


function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

export default async ({ name, email, city, phone, password }) => {
    try {
        await db.query(`
            INSERT INTO users
            (username, email, city, phone, password, created_on)
            VALUES ($1, $2, $3, $4, $5, NOW())
        `, [name, email, city, phone, hashPassword(password)]);

        return {
            created: true,
        };
    } catch (err) {
        if (err.code.toString() === '23505') {
            return {
                created: false,
                message: err.detail.replace("Key ", "")
            };
        }
        throw new Error(err);
    }
};