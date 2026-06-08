import db from './db.js'
import bcrypt from 'bcrypt';
// Add this import if it's not there!
import { getVolunteeredProjects } from '../models/Volunteer.js';

// export const showUserDashboard = async (req, res, next) => {
//     const user = req.session.user;
//     try {
//         // 1. Fetch the data from the model
//         const volunteeredProjects = await getVolunteeredProjects(user.user_id);

//         // 2. PASS IT TO THE RENDER CALL (The part you keep missing!)
//         res.render('user-dashboard', {
//             title: 'My Dashboard',
//             user: user,
//             volunteeredProjects: volunteeredProjects // <-- THIS IS THE FIX
//         });
//     } catch (error) {
//         next(error);
//     }
// };

export const showUserDashboard = async (req, res, next) => {
    const user = req.session.user;
    try {
        // 1. Fetch the data from the model
        const volunteeredProjects = await getVolunteeredProjects(user.user_id);

        // 2. PASS IT TO THE RENDER CALL (The part you keep missing!)
        res.render('user-dashboard', { 
            title: 'My Dashboard',
            user: user,
            volunteeredProjects: volunteeredProjects // <-- THIS IS THE FIX
        });
    } catch (error) {
        next(error);
    }
};
const createUser  = async(name, email, passwordHash) => {
    const default_role = 'user';
   const query = `
        INSERT INTO users (name, email, password_hash, role_id) 
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) 
        RETURNING user_id
    `;
    const queryParams = [name, email, passwordHash, default_role];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0){
        throw new Error('Failed to create user or else i will kick u off my site');
    }
    
    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);

        // console.log('Created new user with ID:', result.rows[0].user_id);
    }
    
    return result.rows[0].user_id;

};

const findUserByEmail = async (email) => {
    const query = `
    SELECT u.user_id, u.email, u.password_hash, r.role_name 
    FROM users u
    JOIN roles r ON u.role_id = r.role_id
    WHERE u.email = $1
`;
    // const query = `
    //     SELECT user_id, name, email, password_hash, role_id 
    //     FROM users 
    //     WHERE email = $1
    // `;
    const queryParams = [email];
    
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        return null; // User not found
    }
    
    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

// 3. THE MASTER FUNCTION (Exported)
const authenticateUser = async (email, password) => {
    // A. Use findUserByEmail to get the user
    const user = await findUserByEmail(email);

    // B. If no user is found, return null
    if (!user) {
        return null;
    }

    // C. Use verifyPassword to check if the password is correct
    const isMatch = await verifyPassword(password, user.password_hash);

    // D. Process the result
    if (isMatch) {
        // Remove the password_hash from the object before returning (Security!)
        delete user.password_hash;
        return user;
    } else {
        // Password doesn't match
        return null;
    }
};
const getAllUsers = async () => {
     const query = `
        SELECT user_id, name, email, role_id 
        FROM users
    `;
    const result = await db.query(query);
    return result.rows;
 }


export { createUser,findUserByEmail, authenticateUser, getAllUsers };
