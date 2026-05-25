import express from 'express';
import { showOrganizationDetailsPage, showOrganizationsPage,  } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './controllers/projects.js';
import { showHomePage } from './controllers/index.js';
import { showCategoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showNewOrganizationForm } from './controllers/organizations.js';
import { processNewOrganizationForm } from './controllers/organizations.js';



const router = express.Router();

router.get('/', showHomePage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/organizations', showOrganizationsPage);
router.get('/categories', showCategoriesPage);
// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', processNewOrganizationForm);
router.get('/test-error', testErrorPage);

export default router;