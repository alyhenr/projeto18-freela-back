import { db } from "../../database/database.js";

const findKey = async (catName) => {
    try {
        const response = await db.query(`
            SELECT id FROM categories
            WHERE name=$1
        `, [catName]);

        if (response.rowCount === 0) return {
            found: false, message: `Invalid category: ${catName}`
        };
        return response.rows[0].id;
    } catch (err) {
        throw new Error(err);
    }
};

export const categoriesKeys = async (catArr) => {
    try {
        const keys = [];
        for (const cat of catArr) {
            try {
                const key = await findKey(cat);
                keys.push(key);
            } catch (err) {
                throw new Error(err);
            }
        }
        return { found: true, keys };
    } catch (err) {
        throw new Error(err);
    }
};