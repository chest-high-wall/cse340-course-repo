
import pool from "../database.js";

export async function getAllCategories() {
  const result = await pool.query(
    "SELECT * FROM public.category ORDER BY category_id"
  );

  return result.rows;
}
