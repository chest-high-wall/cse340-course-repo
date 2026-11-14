
import pool from "../database.js";

export async function getAllProjects() {
  const result = await pool.query(
    "SELECT * FROM public.project ORDER BY project_id"
  );

  return result.rows;
}
