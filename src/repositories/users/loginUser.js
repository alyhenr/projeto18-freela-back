import { db } from "../../database/database.js";
import bcrypt from "bcrypt";


function checkPassword(password1, password2) {
    return bcrypt.compareSync(password1, password2);
}

export default async ({ email, password }) => {
    try {
        const user = await db.query(`
            SELECT id, password, username FROM users
            WHERE email = $1;
        `, [email]);

        if (user.rowCount === 0) {
            return {
                credentialsMatch: false,
                message: "Email not found"
            }
        }

        const match = checkPassword(password, user.rows[0].password);

        if (match) {
            return {
                credentialsMatch: true,
                username: user.rows[0].username,
                userId: user.rows[0].id
            };
        } else {
            return {
                credentialsMatch: false,
                message: "Incorrect password"
            }
        }
    } catch (err) {
        throw new Error(err);
    }
};