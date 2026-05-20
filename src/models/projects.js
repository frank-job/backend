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


const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
      `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

// Export the model functions
export { getProjectsByOrganizationId };



/**
 * 1. getUpcomingProjects
 * Retrieves the next X upcoming projects
 */
const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT 
            p.project_id, 
            p.title, 
            p.description, 
            p.project_date AS date, 
            p.location, 
            p.organization_id, 
            o.name AS organization_name
        FROM project p
        JOIN organization o ON p.organization_id = o.organization_id
        ORDER BY p.project_id ASC
        LIMIT $1;
    `;
    try {
        const result = await db.query(query, [number_of_projects]);
        return result.rows;
    } catch (error) {
        console.error("Error in getUpcomingProjects:", error);
        return [];
    }
};

/**
 * 2. getProjectDetails
 * Retrieves a single project by its ID
 */
const getProjectDetails = async (id) => {
    const query = `
        SELECT 
            p.project_id, 
            p.title, 
            p.description, 
            p.project_date AS date, 
            p.location, 
            p.organization_id, 
            o.name AS organization_name
        FROM project p
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;
    try {
        const result = await db.query(query, [id]);
        return result.rows[0]; // Return only the first (and only) item
    } catch (error) {
        console.error("Error in getProjectDetails:", error);
        return null;
    }
};

// Requirement: Add both to the export statement at the bottom
export { getUpcomingProjects, getProjectDetails };