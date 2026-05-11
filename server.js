

import { getAllOrganizations } from './src/models/organizations.js';
import { testConnection } from './src/models/db.js';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import console from 'console';


const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/projects', async (req, res) => {
    const title = 'Service Projects';
    res.render('projects', { title });
});
app.get('/', (req, res) => {
    // Redirect to organizations page or render a simple message
    res.redirect('/organizations');
});

// app.get('/organizations', async (req, res) => {
//     const title = 'Our Partner Organizations';
//     console.log('Fetching organizations data...'); // Log to indicate that the function is being called
//     const organizations = await getAllOrganizations(); // Assuming you have a function called getAllOrganizations that fetches the organizations data
//     console.log('organizations', organizations); // Log the retrieved organizations to verify data
//     res.render('organizations', { title, organizations });
// });

app.get('/organizations', async (req, res) => {
    // Log the retrieved organizations to verify data


    const title = 'Our Partner Organizations';
    const organizations = await getAllOrganizations();
    // console.log('organizations', organizations);
    res.render('organizations', { title, organizations });
});


// app.listen(PORT, () => {
//   console.log(`Server is running at http://127.0.0.1:${PORT}`);
//   console.log(`Environment: ${NODE_ENV}`);
// });

app.listen(PORT, async () => {
    try {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});