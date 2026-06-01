FULL SESSION TRANSCRIPT: Week 04 Coaching Session
Student: Frank
Mentor: Learning Coach & Software Mentor
Date: May 15, 2026
[START OF SESSION]
Mentor: Welcome! Just to be clear from the start, this is a coaching session, not a test. It is perfectly okay—and even encouraged—to say 'I don't know' or 'I made a mistake.' That's the fastest way we'll learn today. I am your supportive Learning Coach and Software Mentor, and I am excited to talk about the work you've done this week with forms and validation. To get us started, could you please tell me your name?
Frank: Frank
Mentor: It's great to meet you, Frank! Let's dive into our first topic: Handling Form Submissions. Could you please paste a code snippet of the logic you used to process a form submission—specifically the part where you take the data from the request body and pass it to your model function?
Frank:
code
JavaScript
const processNewProjectForm = async (req, res) => {
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
}
Mentor: In your processNewProjectForm function, I see you using this line to pull data out: const { title, description, location, date, organizationId } = req.body;. Can you explain what the req.body object is and how it gets populated?
Frank: req.body is the parsed representation of the form data or JSON payload that the client sent in the request. Middleware like express.urlencoded.
Mentor: Exactly! Let’s move to Topic 2: Forms for Updates. Could you please paste a snippet from your edit-project.ejs showing how you insert existing data from the database into the form's input fields?
Frank:
code
Ejs
<div class="form-group">
    <label for="title">Project Title</label>
    <input type="text" id="title" name="title" value="<%= projectDetails.title %>" maxlength="150" required />
</div>
...
<select id="organizationId" name="organizationId" required>
    <% organizations.forEach(org => { %>
        <option value="<%= org.organization_id %>" <%= org.organization_id === projectDetails.organization_id ? 'selected' : '' %>>
            <%= org.name %>
        </option>
    <% }); %>
</select>
Mentor: I see you're using a ternary operator inside your <option> tag: <%= org.organization_id === projectDetails.organization_id ? 'selected' : '' %>. Why is this specific piece of logic important for an update form?
Frank: it prevents accident data changes and also ensures consistency btn what is stored in db and what to be shown in the ui.
Mentor: Great point! Let’s move to Topic 3: Sessions and Flash Messages. Could you please paste a code snippet showing how you set up sessions or how you "flash" a message to the user?
Frank:
code
JavaScript
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(flash);
Mentor: In your code, you use app.use(session(...)) before setting up the flash middleware. Why is it necessary to have a session active for flash messages to work correctly?
Frank: i have to first set up a mermory.
Mentor: You are exactly right! When you "flash" a message into that memory, what happens to that specific message once the user sees it and refreshes the page?
Frank: the disappear i hard also set time for how long to sta.
Mentor: You're exactly right! Let's move to our final topic, Topic 4: Server-side Validation. Could you please paste a code snippet showing how you implemented server-side validation?
Frank:
code
JavaScript
const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters'),
    ...
];
Mentor: In your organizationValidation array, I notice you use .trim() on the name. Why is it a good practice to "trim" user input before you check the length or save it to your database?
Frank: Removes accidental spaces.
Mentor: Exactly! We have now covered all four mandatory topics. Frank, you did an excellent job.
[END OF SESSION]








-- 1. Wipe the old structure
DROP TABLE IF EXISTS category CASCADE;

-- 2. Create the correct structure
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    category_description TEXT NOT NULL,
    category_image VARCHAR(255) NOT NULL
);

-- 3. Insert all 4 categories with ALL data (name, desc, image)
INSERT INTO category (category_name, category_description, category_image)
VALUES
('Environmental', 'Protect our planet through tree planting and conservation.', 'environmental.jpg'),
('Educational', 'Help students succeed by tutoring and providing school supplies.', 'educational.jpg'),
('Community Service', 'Build a stronger neighborhood by helping at shelters.', 'community.jpg'),
('Health and Wellness', 'Support local clinics and promote healthy living.', 'heath.jpg');

-- 4. Verify the data is there
SELECT * FROM category;



-- ========================================
-- Insert sample data: Service Projects
-- ========================================

CREATE TABLE IF NOT EXISTS project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organization(organization_id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date VARCHAR(100) NOT NULL
);


INSERT INTO project (organization_id, title, description, location, project_date)
VALUES
-- Projects for BrightFuture Builders (Org ID: 1)
(1, 'Tiny Home Construction', 'Help build sustainable small homes for local families.', 'East Side Lot, ', 'June 15, 2026'),
(1, 'Community Center Paint', 'Refreshing the interior of the youth community center.', 'Downtown Center', 'July 10, 2026'),
(1, 'Solar Panel Workshop', 'Installation of solar panels on a non profit office.', 'Green Office Park,', 'August 05, 2026'),
(1, 'Ramp Build Day', 'Building wheelchair ramps for elderly residents.', 'Various Locations', 'September 22, 2026'),
(1, 'Shelter Roof Repair', 'Patching and fixing the roof of the homeless shelter.', 'North Shelter', 'October 12, 2026'),

-- Projects for GreenHarvest Growers (Org ID: 2)
(2, 'Urban Orchard Planting', 'Planting fruit trees in empty neighborhood lots.', 'West Side Community Garden', 'May 20, 2026'),
(2, 'Seed Sorting Day', 'Organizing and labeling seeds for the spring planting.', 'Greenhouse Hub', 'April 15, 2026'),
(2, 'Compost Bin Building', 'Teaching residents how to build and use compost bins.', 'Central Park', 'June 01, 2026'),
(2, 'School Garden Setup', 'Installing vegetable beds at local elementary schools.', 'Riverside Elementary', 'August 18, 2026'),
(2, 'Harvest Festival Help', 'Volunteering to gather and distribute the fall harvest.', 'Market Square', 'September 30, 2026'),

-- Projects for UnityServe Volunteers (Org ID: 3)
(3, 'Senior Tech Support', 'Helping seniors learn to use smartphones and tablets.', 'Heritage Senior Home', 'Weekly - Saturdays'),
(3, 'Food Drive Sorting', 'Sorting and packing 5,000 lbs of donated food.', 'City Food Bank', 'December 05, 2025'),
(3, 'Youth Mentorship Kickoff', 'Orientation for new mentors for high school students.', 'Public Library', 'October 01, 2025'),
(3, 'Neighborhood Cleanup', 'Removing litter and improving city park trails.', 'Canyon Creek Trail', 'June 14, 2026'),
(3, 'Holiday Gift Wrapping', 'Wrapping donated gifts for children in need.', 'Unity Mall Booth', 'December 20, 2025');


INSERT INTO roles (role_name, role_description) VALUES 
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

-- Verify the data was inserted
SELECT * FROM roles;
