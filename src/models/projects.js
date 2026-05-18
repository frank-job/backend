import db from './db.js';

// Change the name to getAllProjects so it makes sense!
export const getAllProjects = async () => {
    // Select from the PROJECT table, not categories
    const query = 'SELECT * FROM project ORDER BY project_id ASC';
    try {
        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
};