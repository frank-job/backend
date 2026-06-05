
Week 05 Coaching Session Transcript
Student Name: Frank
Coach: Learning Coach & Software Mentor
Project: Service Project Network (Authentication & Authorization)
[SESSION START]
Coach: Welcome! Just to be clear from the start, this is a coaching session, not a test. It is perfectly okay—and even encouraged—to say 'I don't know' or 'I made a mistake.' That's the fastest way we'll learn today. I am your supportive Learning Coach and Software Mentor. To get us started, could you please tell me your name?
Frank: Frank
TOPIC 1: Registration and Password Hashing
AI Action: Discuss the users table and creating new users including password hashing.
Frank shared the following Controller code:
code
JavaScript
const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create the user in the database
        const userId = await createUser(name, email, passwordHash);
        req.flash('success', 'Registration successful!');
        res.redirect('/');
    } catch (error) {
        res.redirect('/register');
    }
};
Discussion:
Frank explained that we store a scrambled "hash" in the database instead of plain text so that if hackers ever access the database, they would only see long strings of gibberish rather than the users' real passwords.
TOPIC 2: Login and Sessions
AI Action: Discuss login functionality and how sessions are managed.
Frank shared the following Login code:
code
JavaScript
const processLoginForm = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authenticateUser(email, password);
        if (user) {
            req.session.user = user; // Storing user info in session
            req.flash('success', 'Login successful!');
            return user.role_name === 'admin' ? res.redirect('/dashboard') : res.redirect('/user-dashboard');
        }
        res.redirect('/login');
    } catch (error) {
        res.redirect('/login');
    }
};
Discussion:
Frank explained that req.session.user = user stores the user's information on the server. Because the browser holds a session ID cookie, the server can "remember" who the user is as they move from page to page.
TOPIC 3: Protected Access Middleware
AI Action: Discuss the use of middleware to protect routes (requireLogin and requireAdmin).
Frank shared the following Middleware code:
code
JavaScript
const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in.');
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
Discussion:
Frank demonstrated how these functions are applied to routes in routes.js (e.g., router.get('/users', requireLogin, requireAdmin, showUsersPage)). This ensures that unauthorized users cannot skip the login process by simply typing a URL.
TOPIC 4: Protected Access Links and Navigation
AI Action: Discuss role-based conditional rendering in navigation.
Frank shared the following EJS snippet:
code
Ejs
<% if (isLoggedIn) { %>
    <li><a href="/logout">Logout</a></li>
    <% if (user.role_name === 'admin') { %>
        <li><a href="/users">Manage Users</a></li>
    <% } %>
<% } else { %>
    <li><a href="/register">Register</a></li>
    <li><a href="/login">Login</a></li>
<% } %>
Discussion:
Frank explained that the <%= %> tag evaluates JavaScript and outputs the result into HTML. He used nested if statements to hide sensitive links (like "Manage Users") from anyone who is not a logged-in administrator.
[SESSION CONCLUSION]
Summary: Frank successfully demonstrated the implementation of a secure authentication system. He showed mastery of password hashing with bcrypt, session persistence, route protection via middleware, and conditional UI rendering based on user roles.
[END OF TRANSCRIPT]