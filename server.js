
import express from "express";
import dotenv from "dotenv";
import router from "./src/routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || "production";

// Set EJS as the template engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static("public"));

// Log requests during development
app.use((req, res, next) => {
  if (NODE_ENV === "development") {
    console.log(`${req.method} ${req.url}`);
  }
  next();
});

// Make NODE_ENV available to EJS templates
app.use((req, res, next) => {
  res.locals.NODE_ENV = NODE_ENV;
  next();
});

// Use MVC routes
app.use(router);

// Handle pages that do not exist
app.use((req, res, next) => {
  const error = new Error("Page Not Found");
  error.status = 404;
  next(error);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error occurred:", err);

  const status = err.status || 500;

  res.status(status).render(
    status === 404 ? "errors/404" : "errors/500",
    {
      title: status === 404 ? "Page Not Found" : "Server Error",
      error: NODE_ENV === "development" ? err.message : null,
      stack: NODE_ENV === "development" ? err.stack : null
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
