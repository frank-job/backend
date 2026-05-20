Week 02 Coaching Session Transcript
Student: Frank
Coach: Learning Coach & Software Mentor
Mentor: Welcome! Just to be clear from the start, this is a coaching session, not a test. It is perfectly okay—and even encouraged—to say 'I don't know' or 'I made a mistake.' That's the fastest way we'll learn today. I am your Learning Coach and Software Mentor. I know we have been working together, but to officially begin this session, could you please tell me your name?
Frank: FRank
Mentor: It's great to meet you, Frank! Let's jump into our first topic: Relational Database Design and Structure. In this assignment, you moved from hardcoded data to a database. Could you please describe the purpose of the tables you created and paste a snippet of the SQL code you used?
Frank: It helps keep my data safe. I used this code to build the structure:
code
SQL
CREATE TABLE IF NOT EXISTS project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organization(organization_id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date VARCHAR(100) NOT NULL
);

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    category_description TEXT NOT NULL,
    category_image VARCHAR(255) NOT NULL
);
Mentor: Those SQL snippets show a great structure! I see you used a Foreign Key in your project table. In your own words, what does that line do and why is it important?
Frank: The foreign key line ensures my projects aren’t floating around without context — they’re always tied to a real organization, which keeps your database structured and meaningful.
Mentor: Excellent explanation! Let's move to Topic 2: Server-Side Data Access Logic (Node.js). Could you please paste the code for one of your Node.js functions from a model file?
Frank: I used these to get the data:
code
JavaScript
export const getAllProjects = async () => {
    const query = 'SELECT * FROM project ORDER BY project_id ASC';
    try {
        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
};

export const getAllCategories = async () => {
    const query = 'SELECT * FROM category ORDER BY category_name ASC';
    const result = await db.query(query);
    return result.rows;
};
Mentor: Those are clean model functions! In your getAllProjects function, why did you choose to use a try...catch block?
Frank: The try...catch block is my safety net for sure — it links error handling directly to my database call, keeping your data retrieval reliable and your application organized.
Mentor: That’s a great way to put it! Let’s move to Topic 3: Express Server Logic and Routing. Could you please paste a snippet from your server.js file that shows one of your routing declarations?
Frank:
code
JavaScript
app.get('/projects', async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';
    res.render('projects', { title: 'projects', projects });
});

app.get('/categories', async (req, res) => {
    const categories = await getAllCategories();
    res.render('categories', { title: 'Categories', categories });
});
Mentor: In your /categories route, you have the line res.render('categories', { title: 'Categories', categories });. Can you explain what you are doing in that second part (the { title, categories } block)?
Frank: The { title, categories } block is the “data package” i send to EJS, and it’s what allows my template to render the correct heading and list of categories on the page.
Mentor: That's a great analogy! Let’s move to our final topic: Topic 4: Client-Side Rendering (EJS Templates). Could you please paste a snippet from one of your EJS files showing how you display the list?
Frank:
code
Ejs
<ul class="grid-list">
    <% projects.forEach(project=> { %>
        <li>
            <strong><%= project.title %></strong>
            <p><strong>Location:</strong> <%= project.location %></p>
            <p class="category-desc"><%= project.description %></p>
            <a href="#" class="btn-small">Sign Up to Help</a>
        </li>
    <% }); %>
</ul>
Mentor: In your EJS snippet, I see you using the <%= ... %> tag. What does that specific tag do compared to a regular HTML tag?
Frank: It evaluates the JavaScript expression inside the tag and outputs the result as text into your HTML.
Mentor: Spot on, Frank! This concludes our coaching session. You did a great job today.