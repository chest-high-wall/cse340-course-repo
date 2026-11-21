
import pool from "../database.js";

// Retrieve all categories
export async function getAllCategories() {
  const result = await pool.query(
    "SELECT * FROM public.category ORDER BY category_id"
  );

  return result.rows;
}

// Retrieve one category by its ID
export async function getCategoryDetails(categoryId) {
  const query = `
    SELECT
      category_id,
      name
    FROM public.category
    WHERE category_id = $1
  `;

  const result = await pool.query(query, [categoryId]);

  return result.rows.length > 0 ? result.rows[0] : null;
}

// Retrieve all projects associated with a category
export async function getProjectsByCategoryId(categoryId) {
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
    JOIN public.project_category pc
      ON p.project_id = pc.project_id
    JOIN public.organization o
      ON p.organization_id = o.organization_id
    WHERE pc.category_id = $1
    ORDER BY p.date
  `;

  const result = await pool.query(query, [categoryId]);

  return result.rows;
}
