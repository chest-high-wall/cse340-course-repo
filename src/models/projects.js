
import pool from "../database.js";

// Retrieve all service projects
export async function getAllProjects() {
  const result = await pool.query(
    "SELECT * FROM public.project ORDER BY project_id"
  );

  return result.rows;
}

// Retrieve the next five upcoming service projects
export async function getUpcomingProjects() {
  const query = `
    SELECT
      p.project_id,
      p.organization_id,
      p.title,
      p.description,
      p.location,
      p.date,
      o.name AS organization_name
    FROM public.project p
    JOIN public.organization o
      ON p.organization_id = o.organization_id
    WHERE p.date >= CURRENT_DATE
    ORDER BY p.date ASC, p.project_id ASC
    LIMIT 5
  `;

  const result = await pool.query(query);

  return result.rows;
}

// Retrieve projects belonging to a specific organization
export async function getProjectsByOrganizationId(organizationId) {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      date
    FROM public.project
    WHERE organization_id = $1
    ORDER BY date
  `;

  const result = await pool.query(query, [organizationId]);

  return result.rows;
}

// Retrieve one project and its organization information
export async function getProjectDetails(projectId) {
  const query = `
    SELECT
      p.project_id,
      p.organization_id,
      p.title,
      p.description,
      p.location,
      p.date,
      o.name AS organization_name
    FROM public.project p
    JOIN public.organization o
      ON p.organization_id = o.organization_id
    WHERE p.project_id = $1
  `;

  const result = await pool.query(query, [projectId]);

  return result.rows.length > 0 ? result.rows[0] : null;
}

// Retrieve all categories associated with a project
export async function getCategoriesByProjectId(projectId) {
  const query = `
    SELECT
      c.category_id,
      c.name
    FROM public.category c
    JOIN public.project_category pc
      ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name
  `;

  const result = await pool.query(query, [projectId]);

  return result.rows;
}
