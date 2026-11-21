
import {
  getUpcomingProjects,
  getProjectDetails,
  getCategoriesByProjectId
} from "../models/projects.js";

// Display the next five upcoming service projects
const showProjectsPage = async (req, res, next) => {
  try {
    const projects = await getUpcomingProjects();

    res.render("projects", {
      title: "Service Projects",
      projects
    });
  } catch (error) {
    next(error);
  }
};

// Display details for one service project
const showProjectDetailsPage = async (req, res, next) => {
  try {
    const projectId = req.params.id;

    const projectDetails = await getProjectDetails(projectId);

    if (!projectDetails) {
      const error = new Error("Project Not Found");
      error.status = 404;
      return next(error);
    }

    const categories = await getCategoriesByProjectId(projectId);

    res.render("project", {
      title: projectDetails.title,
      projectDetails,
      categories
    });
  } catch (error) {
    next(error);
  }
};

export {
  showProjectsPage,
  showProjectDetailsPage
};
