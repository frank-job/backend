import express from 'express';
import { showOrganizationDetailsPage, showOrganizationsPage,  } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm,handleVolunteerAction, handleUnvolunteerAction  } from './controllers/projects.js';
import { showHomePage } from './controllers/index.js';
import { showCategoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showNewOrganizationForm } from './controllers/organizations.js';
import { processNewOrganizationForm, organizationValidation,showEditOrganizationForm,processEditOrganizationForm } from './controllers/organizations.js';
import { showAssignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';
import { showUserRegistrationForm, 
   processUserRegistrationForm, 
   showLoginForm, 
   processLoginForm, 
   processLogout,
   requireLogin,
   requireAdmin,
   showDashboard,
   showUserDashboard,
   showUsersPage,
   requireRole
} from './controllers/users.js';

// import{ showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout,processLoginForm, processLogout, requireLogin, ShowDashboard } from './controllers/users.js';
const router = express.Router();

router.get('/', showHomePage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/organizations', showOrganizationsPage);
router.get('/categories', showCategoriesPage);
// Route for new organization page
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
router.get('/test-error', testErrorPage);
// Route to display the edit organization form
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
// Route to handle the edit organization form submission
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', requireRole('admin'), showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', requireRole('admin'), processNewProjectForm, projectValidation);

router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);


router.get('/edit-project/:projectId', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:projectId', requireRole('admin'), processEditProjectForm);


router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Admin dashboard - admin only
router.get('/dashboard', requireLogin, requireAdmin, showDashboard);

// User dashboard - logged in users
router.get('/user-dashboard', requireLogin, showUserDashboard);

// Users page - admin only
router.get('/users', requireLogin, requireAdmin, showUsersPage);

router.post('/project/volunteer/:id', requireLogin, handleVolunteerAction);
router.post('/project/unvolunteer/:id', requireLogin, handleUnvolunteerAction);

export default router;