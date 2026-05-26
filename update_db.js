import db from './src/models/db.js';

async function run() {
    try {
        console.log("Creating project_category table...");
        await db.query(`
            CREATE TABLE IF NOT EXISTS project_category (
                project_id INT NOT NULL REFERENCES project(project_id) ON DELETE CASCADE,
                category_id INT NOT NULL REFERENCES category(category_id) ON DELETE CASCADE,
                PRIMARY KEY (project_id, category_id)
            );
        `);
        console.log("project_category table created successfully!");

        // Let's insert some sample mappings if empty
        const countRes = await db.query('SELECT COUNT(*) FROM project_category');
        if (parseInt(countRes.rows[0].count, 10) === 0) {
            console.log("Inserting sample project-category mappings...");
            await db.query(`
                INSERT INTO project_category (project_id, category_id)
                VALUES 
                (1, 1), -- Tiny Home Construction (Environmental)
                (1, 3), -- Tiny Home Construction (Community Service)
                (2, 3), -- Community Center Paint (Community Service)
                (3, 1), -- Solar Panel Workshop (Environmental)
                (6, 1), -- Urban Orchard Planting (Environmental)
                (6, 3)  -- Urban Orchard Planting (Community Service)
                ON CONFLICT DO NOTHING;
            `);
            console.log("Sample mappings inserted!");
        }

    } catch (err) {
        console.error(err);
    } finally {
        await db.close();
    }
}
run();
