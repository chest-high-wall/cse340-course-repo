
import {
  getAllOrganizations,
  getOrganizationDetails
} from "../models/organizations.js";

import {
  getProjectsByOrganizationId
} from "../models/projects.js";

// Display all organizations
const showOrganizationsPage = async (req, res, next) => {
  try {
    const organizations = await getAllOrganizations();

    res.render("organizations", {
      title: "Organizations",
      organizations
    });
  } catch (error) {
    next(error);
  }
};

// Display details for one organization
const showOrganizationDetailsPage = async (req, res, next) => {
  try {
    const organizationId = req.params.id;

    const organizationDetails =
      await getOrganizationDetails(organizationId);

    if (!organizationDetails) {
      const error = new Error("Organization Not Found");
      error.status = 404;
      return next(error);
    }

    const projects =
      await getProjectsByOrganizationId(organizationId);

    res.render("organization", {
      title: organizationDetails.name,
      organizationDetails,
      projects
    });
  } catch (error) {
    next(error);
  }
};

export {
  showOrganizationsPage,
  showOrganizationDetailsPage
};
