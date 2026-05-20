// Import any needed model functions
import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';

// 2. Create the constant for the limit
const NUMBER_OF_UPCOMING_PROJECTS = 5;

/**
 * Update the main projects page
 * Now shows only the next 5 upcoming projects
 */
export const showProjectsPage = async (req, res, next) => {
    try {
        // Call the model function with our constant (5)
        const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

        // Render the list page with the new title
        res.render('projects', {
            title: 'Upcoming Service Projects',
            projects
        });
    } catch (error) {
        // Pass the error to our global error handler
        next(error);
    }
};

/**
 * New Controller: showProjectDetailsPage
 * Handles requests for a single project (e.g., /project/5)
 */
export const showProjectDetailsPage = async (req, res, next) => {
    try {
        // 3. Extract the ID from the URL parameters (:id)
        const id = req.params.id;

        // 4. Use the model function to get that specific project
        const project = await getProjectDetails(id);

        // 5. If no project is found, we should trigger a 404
        if (!project) {
            const error = new Error('Project not found');
            error.status = 404;
            return next(error);
        }

        // 6. Render the NEW details view (project.ejs)
        res.render('project', {
            title: project.title, // Use the project's actual name as the page title
            project: project
        });
    } catch (error) {
        next(error);
    }
};