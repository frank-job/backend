-- =========================================================
-- 1. FIRST: Create and Fill Organizations (Projects need these!)
-- =========================================================
CREATE TABLE IF NOT EXISTS organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on community infrastructure.', 'info@brightfuture.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group.', 'hello@unityserve.org', 'unityserve-logo.png')
ON CONFLICT DO NOTHING;


-- =========================================================
-- 2. SECOND: Handle Categories (Your code was good here!)
-- =========================================================
DROP TABLE IF EXISTS category CASCADE;

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    category_description TEXT NOT NULL,
    category_image VARCHAR(255) NOT NULL
);

INSERT INTO category (category_name, category_description, category_image)
VALUES
('Environmental', 'Protect our planet through tree planting and conservation.', 'environmental.jpg'),
('Educational', 'Help students succeed by tutoring and providing school supplies.', 'educational.jpg'),
('Community Service', 'Build a stronger neighborhood by helping at shelters.', 'community.jpg'),
('Health and Wellness', 'Support local clinics and promote healthy living.', 'heath.jpg');


-- =========================================================
-- 3. THIRD: Create and Fill Projects
-- =========================================================
DROP TABLE IF EXISTS project CASCADE;

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organization(organization_id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date VARCHAR(100) NOT NULL
);


INSERT INTO project (organization_id, title, description, location, project_date)
VALUES
(1, 'Tiny Home Construction', 'Help build sustainable small homes for local families.', 'East Side Lot', 'June 15, 2026'),
(1, 'Community Center Paint', 'Refreshing the interior of the youth community center.', 'Downtown Center', 'July 10, 2026'),
(1, 'Solar Panel Workshop', 'Installation of solar panels on a non profit office.', 'Green Office Park', 'August 05, 2026'),
(1, 'Ramp Build Day', 'Building wheelchair ramps for elderly residents.', 'Various Locations', 'September 22, 2026'),
(1, 'Shelter Roof Repair', 'Patching and fixing the roof of the homeless shelter.', 'North Shelter', 'October 12, 2026'),
(2, 'Urban Orchard Planting', 'Planting fruit trees in empty neighborhood lots.', 'West Side Community Garden', 'May 20, 2026'),
(2, 'Seed Sorting Day', 'Organizing and labeling seeds for the spring planting.', 'Greenhouse Hub', 'April 15, 2026'),
(2, 'Compost Bin Building', 'Teaching residents how to build and use compost bins.', 'Central Park', 'June 01, 2026'),
(2, 'School Garden Setup', 'Installing vegetable beds at local elementary schools.', 'Riverside Elementary', 'August 18, 2026'),
(2, 'Harvest Festival Help', 'Volunteering to gather and distribute the fall harvest.', 'Market Square', 'September 30, 2026'),
(3, 'Senior Tech Support', 'Helping seniors learn to use smartphones and tablets.', 'Heritage Senior Home', 'Weekly - Saturdays'),
(3, 'Food Drive Sorting', 'Sorting and packing 5,000 lbs of donated food.', 'City Food Bank', 'December 05, 2025'),
(3, 'Youth Mentorship Kickoff', 'Orientation for new mentors for high school students.', 'Public Library', 'October 01, 2025'),
(3, 'Neighborhood Cleanup', 'Removing litter and improving city park trails.', 'Canyon Creek Trail', 'June 14, 2026'),
(3, 'Holiday Gift Wrapping', 'Wrapping donated gifts for children in need.', 'Unity Mall Booth', 'December 20, 2025');



CREATE TABLE roles (
	role_id SERIAL PRIMARY KEY,
	role_name VARCHAR(50)  UNIQUE NOT NULL,
	role_description TEXT
);

INSERT INTO roles (role_name, role_description)
VALUES
    ('user', 'Regular user with limited access')    
	('admin', 'Administrator with full access'),
	
ON CONFLICT DO NOTHING;

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	role_id INTEGER REFERENCES roles(role_id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

	
);
-- -- ========================================
-- -- Create Project_Volunteer Join Table
-- -- ========================================
-- CREATE TABLE IF NOT EXISTS project_volunteer (
--     project_id INT REFERENCES project(project_id) ON DELETE CASCADE,
--     user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
--     PRIMARY KEY (project_id, user_id)
-- );


-- Create the missing Join Table
CREATE TABLE IF NOT EXISTS project_volunteer (
    project_id INT REFERENCES project(project_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, user_id)
);

SELECT * FROM organization;
SELECT * FROM category;
SELECT * FROM project;
SELECT * FROM roles;