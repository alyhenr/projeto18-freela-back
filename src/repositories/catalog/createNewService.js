import { db } from "../../database/database.js";
import { categoriesKeys } from "./mapCategories.js";

export default async ({
    userId, description, price, duration, categories
}) => {
    try {
        const findCategories = await categoriesKeys(categories);

        if (!findCategories.found) return {
            created: false,
            status: 400,
            message: findCategories.message,
        }

        const response = await db.query(`
            INSERT INTO catalog
            (user_id, description, price,
             duration, categories)
            VALUES ($1, $2, $3, $4, $5);
        `, [userId, description, price, duration, findCategories.keys]);

        if (response.rowCount === 0) return {
            created: false,
            status: 409,
            message: "Conflict",
        }

        return { created: true };
    } catch (err) {
        throw new Error(err);
    }
};