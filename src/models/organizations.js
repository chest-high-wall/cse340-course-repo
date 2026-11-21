
import pool from "../database.js";

// Retrieve all organizations
export async function getAllOrganizations() {
  const result = await pool.query(
    "SELECT * FROM public.organization ORDER BY organization_id"
  );

  return result.rows;
}

// Retrieve one organization by its ID
export async function getOrganizationDetails(organizationId) {
  const query = `
    SELECT
      organization_id,
      name,
      description,
      contact_email,
      logo_filename
    FROM public.organization
    WHERE organization_id = $1
  `;

  const result = await pool.query(query, [organizationId]);

  return result.rows.length > 0 ? result.rows[0] : null;
}
