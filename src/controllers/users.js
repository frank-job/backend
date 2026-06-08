import bcrypt from 'bcrypt';
import { createUser, authenticateUser, getAllUsers } from '../models/users.js';
import { getVolunteeredProjects } from '../models/Volunteer.js';

const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create the user in the database
        const userId = await createUser(name, email, passwordHash);
        // Redirect to the home page after successful registration
        req.flash('success', 'Registration successful! Please log in u are good boy or girl.');
        res.redirect('/');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'hi seems ur creditents are beig used to to login maybe and check ur details.');
        res.redirect('/register');
    }
};



const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);
        if (user) {
            // Store user info in session
            req.session.user = user;
            req.flash('success', 'Login successful! welcome back boss u are on right track');
            
            // Redirect admin to dashboard, regular users to user dashboard
            if (user.role_name === 'admin') {
                return res.redirect('/dashboard');
            } else {
                return res.redirect('/user-dashboard');
            }
        } else {
            req.flash('error', 'Invalid email or password boss check properly your password.');
            res.redirect('/login');
        }
    } catch (error) {
         console.error('Error during login:', error);
        req.flash('error', 'Something went wrong on our side. Please try again.');
        return res.redirect('/login');
    }
};

const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }

    req.flash('success', 'Logout successful! thanks for comimg back soon.');
    res.redirect('/login');
};

const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }
    next();
};

const requireAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role_name !== 'admin') {
        req.flash('error', 'Access granted only to admin users');
        return res.redirect('/dashboard');
    }
    next();
};


const showDashboard = (req, res) => {
    const user = req.session.user;
    res.render('dashboard', { 
        title: 'Dashboard',
        name: user.name,
        email: user.email,
        isAdmin: user.role_name === 'admin'
    });
};

const showUserDashboard = async (req, res, next) => {
    try {
        const user = req.session.user;
        const volunteeredProjects = await getVolunteeredProjects(user.user_id);

        res.render('user-dashboard', { 
            title: 'My Dashboard',
            name: user.name,
            email: user.email,
            isAdmin: user.role_name === 'admin',
            volunteeredProjects
        });
    } catch (error) {
        next(error);
    }
};


const showUsersPage = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.render('users', {
            title: 'Users',
            users: users,
            isAdmin: req.session.user.role_name === 'admin'
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        req.flash('error', 'Error loading users page');
        res.redirect('/dashboard');
    }
};


/**
 * Middleware factory to require specific role for route access
 * Returns middleware that checks if user has the required role
 * 
 * @param {string} role - The role name required (e.g., 'admin', 'user')
 * @returns {Function} Express middleware function
 */
const requireRole = (role) => {
    return (req, res, next) => {
        // Check if user is logged in first
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access this page.');
            return res.redirect('/login');
        }

        // Check if user's role matches the required role
        if (req.session.user.role_name !== role) {
            req.flash('error', 'You do not have permission to access this page.');
            return res.redirect('/');
        }

        // User has required role, continue
        next();
    };
};
// Copy and paste this to replace your current export statement
export { 
    showUserRegistrationForm, 
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
};
 

// // 2. Update the dashboard function
