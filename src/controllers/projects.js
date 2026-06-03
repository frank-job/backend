// Import any needed model functions
import { getUpcomingProjects, getProjectDetails, createProject, updateProject } from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';

// Import the body and validationResult functions from the express - validator package.
import { body, validationResult } from 'express-validator';

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

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations });
}

const processNewProjectForm = async (req, res) => {
    // Check for validation errors FIRST
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        const organizations = await getAllOrganizations();
        return res.render('new-project', { 
            title: 'Add New Service Project', 
            organizations,
            errors: errors.array()
        });
    }

    // Extract form data from req.body
    const { title, description, location, date, organizationId } = req.body;

    try {
        // Create the new project in the database
        const newProjectId = await createProject(title, description, location, date, organizationId);

        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
};


const projectValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be a valid date format'),
    body('organizationId')
        .notEmpty().withMessage('Organization is required')
        .isInt().withMessage('Organization must be a valid integer')
];

// showEditProjectForm and processEditProjectForm 

const showEditProjectForm = async (req, res) => {
    const projectId = req.params.projectId;
    const projectDetails = await getProjectDetails(projectId);
    const organizations = await getAllOrganizations();

    const title = 'Edit Project';

    res.render('edit-project', { title, projectId, projectDetails, organizations });
};





const processEditProjectForm = async (req, res) => {
    const projectId = req.params.projectId;

    // Check for validation errors FIRST
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit project form
        return res.redirect(`/edit-project/${projectId}`);
    }

    const { title, description, location, date, organizationId } = req.body;

    try {
        // Update the project in the database
        await updateProject(projectId, title, description, date, location, organizationId);

        req.flash('success', 'Project updated successfully!');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error updating project:', error);
        req.flash('error', 'There was an error updating the service project.');
        res.redirect(`/edit-project/${projectId}`);
    }
}
    
export {
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
    showEditProjectForm,
    processEditProjectForm
};