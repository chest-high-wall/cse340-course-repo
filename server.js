
import express from "express";
import dotenv from "dotenv";
import { getAllOrganizations } from "./src/models/organizations.js";
import { getAllProjects } from "./src/models/projects.js";
import { getAllCategories } from "./src/models/categories.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");

// Serve static files from the public folder
app.use(express.static("public"));

// Home page
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Organizations page - Retrieve data from PostgreSQL
app.get("/organizations", async (req, res) => {
  try {
    const organizations = await getAllOrganizations();

    res.render("organizations", {
      title: "Organizations",
      organizations: organizations
    });
  } catch (error) {
    console.error("Error loading organizations:", error);
    res.status(500).send("Error loading organizations");
  }
});

// Service projects page - Retrieve data from PostgreSQL
app.get("/projects", async (req, res) => {
  try {
    const projects = await getAllProjects();

    res.render("projects", {
      title: "Service Projects",
      projects: projects
    });
  } catch (error) {
    console.error("Error loading projects:", error);
    res.status(500).send("Error loading projects");
  }
});

// Categories page - Retrieve data from PostgreSQL
app.get("/categories", async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.render("categories", {
      title: "Categories",
      categories: categories
    });
  } catch (error) {
    console.error("Error loading categories:", error);
    res.status(500).send("Error loading categories");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
