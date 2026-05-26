import db from './db.js'; // Use your existing db connection

export const getAllCategories = async () => {
    const query = 'SELECT category_id, category_name AS name, category_description, category_image FROM category ORDER BY category_name ASC';
    try {
        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const getCategoriesByServiceProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.category_name AS name, c.category_description, c.category_image
        FROM category c
        JOIN project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
    `;
    try {
        const result = await db.query(query, [projectId]);
        return result.rows;
    } catch (error) {
        console.error("Error in getCategoriesByServiceProjectId:", error);
        return [];
    }
};

export const updateCategoryAssignments = async (projectId, categoryIdsArray) => {
    try {
        // Start by deleting all existing assignments for this project
        await db.query('DELETE FROM project_category WHERE project_id = $1', [projectId]);

        // If there are new categories, insert them
        if (categoryIdsArray && categoryIdsArray.length > 0) {
            // Filter out any empty/falsy values
            const validIds = categoryIdsArray.filter(id => id);
            if (validIds.length > 0) {
                const valuePlaceholders = validIds.map((_, index) => `($1, $${index + 2})`).join(', ');
                const query = `INSERT INTO project_category (project_id, category_id) VALUES ${valuePlaceholders}`;
                const params = [projectId, ...validIds];
                await db.query(query, params);
            }
        }
        return true;
    } catch (error) {
        console.error("Error in updateCategoryAssignments:", error);
        throw error;
    }
};