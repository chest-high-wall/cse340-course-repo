
CREATE TABLE IF NOT EXISTS public.organization (
    organization_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255)
);

INSERT INTO public.organization
(name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders',
 'Helping improve communities through construction and service.',
 'info@brightfuture.org',
 'brightfuture.png'),

('GreenHarvest Growers',
 'Supporting community gardens and environmental projects.',
 'contact@greenharvest.org',
 'greenharvest.png'),

('UnityServe Volunteers',
 'Connecting volunteers with local service opportunities.',
 'hello@unityserve.org',
 'unityserve.png');

SELECT * FROM public.organization;

CREATE TABLE IF NOT EXISTS public.project (
    project_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    location VARCHAR(150),
    date DATE NOT NULL,
    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES public.organization(organization_id)
);

INSERT INTO public.project
(organization_id, title, description, location, date)
VALUES
(1, 'Park Cleanup', 'Clean up local parks.', 'St. George, UT', '2026-12-01'),
(1, 'Home Repairs', 'Help repair homes.', 'Hurricane, UT', '2026-12-03'),
(1, 'Playground Build', 'Build a community playground.', 'Washington, UT', '2026-12-05'),
(1, 'School Painting', 'Paint local classrooms.', 'St. George, UT', '2026-12-07'),
(1, 'Trail Restoration', 'Restore hiking trails.', 'Ivins, UT', '2026-12-09'),

(2, 'Community Garden', 'Plant vegetables for families.', 'St. George, UT', '2026-12-02'),
(2, 'Tree Planting', 'Plant trees in local parks.', 'Hurricane, UT', '2026-12-04'),
(2, 'Food Harvest', 'Harvest produce for food banks.', 'Washington, UT', '2026-12-06'),
(2, 'Garden Workshop', 'Teach gardening skills.', 'Ivins, UT', '2026-12-08'),
(2, 'Composting Project', 'Build community compost bins.', 'St. George, UT', '2026-12-10'),

(3, 'Food Drive', 'Collect food donations.', 'St. George, UT', '2026-12-11'),
(3, 'Community Tutoring', 'Tutor local students.', 'Hurricane, UT', '2026-12-12'),
(3, 'Senior Assistance', 'Help elderly residents.', 'Washington, UT', '2026-12-13'),
(3, 'Clothing Drive', 'Collect donated clothing.', 'Ivins, UT', '2026-12-14'),
(3, 'Holiday Outreach', 'Deliver holiday care packages.', 'St. George, UT', '2026-12-15');

SELECT * FROM public.project;




CREATE TABLE IF NOT EXISTS public.category (
    category_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id)
        REFERENCES public.project(project_id),
    FOREIGN KEY (category_id)
        REFERENCES public.category(category_id)
);

INSERT INTO public.category (name)
VALUES
('Environment'),
('Community Development'),
('Education'),
('Humanitarian Aid');

INSERT INTO public.project_category (project_id, category_id)
SELECT p.project_id,
       CASE
           WHEN p.organization_id = 1 THEN 2
           WHEN p.organization_id = 2 THEN 1
           WHEN p.title = 'Community Tutoring' THEN 3
           ELSE 4
       END
FROM public.project p;

SELECT * FROM public.category;

SELECT * FROM public.project_category;


