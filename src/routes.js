import express from 'express';
import { showOrganizationDetailsPage, showOrganizationsPage,  } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm  } from './controllers/projects.js';
import { showHomePage } from './controllers/index.js';
import { showCategoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showNewOrganizationForm } from './controllers/organizations.js';
import { processNewOrganizationForm, organizationValidation,showEditOrganizationForm,processEditOrganizationForm } from './controllers/organizations.js';

import { showAssignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';

import{ showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout} from './controllers/users.js';
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
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.get('/test-error', testErrorPage);
// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);
// Route to handle the edit organization form submission
// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', processNewProjectForm, projectValidation);

router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);


router.get('/edit-project/:projectId', showEditProjectForm);
router.post('/edit-project/:projectId', processEditProjectForm);


router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
export default router;