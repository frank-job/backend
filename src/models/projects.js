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
          project_date AS date
        FROM project
        WHERE organization_id = $1
        ORDER BY project_date;
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



const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO project (title, description, location, date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

const updateProject = async(projectId, title, description, date, location, organizationId) => {
    const query = `
    UPDATE project
    SET title = $1,  description = $2,  date = $3, location = $4, organization_id = $5
    WHERE project_id = $6
    RETURNING project_id;
    `;

    const queryParams = [title, description, date, location, organizationId, projectId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to update project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}






// Requirement: Add both to the export statement at the bottom
export {
    getUpcomingProjects,
    getProjectDetails,
    createProject,
    updateProject
};