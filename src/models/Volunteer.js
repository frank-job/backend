import db from './db.js';
// 1. MAKE SURE this import is at the very top of users.js

 const addVolunteer = async (projectId, userId) => {
    const query = 'INSERT INTO project_volunteer (project_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING';
    return await db.query(query, [projectId, userId]);
};

// Remove a user from a project
const removeVolunteer = async (projectId, userId) => {
    const query = 'DELETE FROM project_volunteer WHERE project_id = $1 AND user_id = $2';
    return await db.query(query, [projectId, userId]);
};

// Get all projects a specific user signed up for
const getVolunteeredProjects = async (userId) => {
    const query = `
        SELECT p.*, o.name as organization_name 
        FROM project p
        JOIN project_volunteer pv ON p.project_id = pv.project_id
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE pv.user_id = $1`;
    const result = await db.query(query, [userId]);
    return result.rows;
};

// Check if user is already volunteering (for the button toggle)
 const isUserVolunteering = async (projectId, userId) => {
    const query = 'SELECT * FROM project_volunteer WHERE project_id = $1 AND user_id = $2';
    const result = await db.query(query, [projectId, userId]);
    return result.rows.length > 0;
};

export {
    
    isUserVolunteering,
    getVolunteeredProjects,
    removeVolunteer,
    addVolunteer
}