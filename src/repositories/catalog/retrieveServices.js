import { db } from "../../database/database.js";

export const retrieveAllServices = async () => {
    try {
        const services = (await db.query(`
            SELECT c.id, u.id as userId, username, email,
            phone, city,
            description,
            price, categories,
            duration
            FROM catalog AS c
            JOIN users AS u ON c.user_id = u.id;
        `)).rows;

        //Categories names map:
        const categories = (await db.query(`
        SELECT * FROM categories;
        `)).rows;
        const categoriesMap = {};
        categories.forEach(category => {
            categoriesMap[category.id] = category.name
        });

        const data = {
            services,
            categoriesMap
        };
        return data;
    } catch (err) {
        throw new Error(err);
    }
};