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
(1, 'Tiny Home Construction', 'Help build sustainable small homes for local families.', 'East Side Lot', 'June 15, 2026'),
(1, 'Community Center Paint', 'Refreshing the interior of the youth community center.', 'Downtown Center', 'July 10, 2026'),
(1, 'Solar Panel Workshop', 'Installation of solar panels on a nonprofit office.', 'Green Office Park', 'August 05, 2026'),
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



