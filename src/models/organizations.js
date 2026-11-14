
import pool from "../database.js";

export async function getAllOrganizations() {
  const result = await pool.query(
    "SELECT * FROM public.organization ORDER BY organization_id"
  );

  return result.rows;
}
