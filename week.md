FULL SESSION TRANSCRIPT: Week 01 Coaching Session
Student: Frank Yakan 
Mentor: AI Learning Coach
Date: May 4, 2026
[START OF SESSION]
Mentor: Welcome! Just to be clear from the start, this is a coaching session, not a test. It is perfectly okay—and even encouraged—to say 'I don't know' or 'I made a mistake.' That's the fastest way we'll learn today. I'm your Learning Coach and Software Mentor. To get us started, could you please tell me your name?
Frank: frank
Mentor: It's great to meet you, Frank! Let's start with our first topic: Express Routing. Could you please paste a code snippet from your server.js file that shows how you set up one of your routes?
Frank:
code
JavaScript
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

app.get('/organizations', async (req, res) => {
    const title = 'Our Partner Organizations';
    res.render('organizations', { title });
});
...
Mentor: That looks like a solid set of routes, Frank! In your route for /organizations, you have (req, res). Can you explain in your own words what those two objects represent?
Frank: (req, res) request and response
Mentor: Exactly! So, when you look at the line res.render('organizations', { title });, which of those two is doing the job of sending the final HTML back to the user's screen?
Frank: res.render('organizations i think it this one because when user click on organization server gives response like hi i think this guy need organization then server says okbro get ur page
Mentor: Haha, that is a perfect way to describe it! Let's move to Topic 2: JavaScript Language Principles. Why did you choose to use arrow functions => instead of the older function() keyword?
Frank: arrow function simplify work because when i use arrow as it says arrow for it stragit to point and it handles error very very then other functioneven thy where bulky to work with
Mentor: They definitely keep things cleaner! Let's jump into Topic 3: EJS Partials and Pages. Could you please paste a snippet from your ejs files so I can see how you included your header and footer?
Frank:
code
Ejs
<%- include('partials/header') %>
<main>
    <h1><%= title %></h1>
    ...
</main>
<%- include('partials/footer') %>
Mentor: Great snippets! What is the difference between using the hyphen (-) and the equals sign (=) in those EJS tags?
Frank: <%- include(...) %> it only inject data as it is without ant modifcation <%= title %>it atleast modifes it u can also give me some explanation
Mentor: You've got the basic idea! The hyphen (-) is for raw HTML (like partials), and the equals sign (=) is for "escaped" data (like the title variable) to keep it safe. We have one topic left: Topic 4: Frontend CSS. Could you please paste a snippet of your CSS code—specifically the responsive part?
Frank:
code
CSS
@media (max-width: 768px) {
    nav {
        flex-direction: column;
        text-align: center;
    }
    ...
}
Mentor: That is a very clean stylesheet! How does changing the flex-direction of your nav to column help the user experience on a mobile phone?
Frank: it mini view of the site without using hamburger 🍔
Mentor: Stacking them makes it much easier to read and tap! We have now covered all four mandatory topics. Frank, you did an excellent job.