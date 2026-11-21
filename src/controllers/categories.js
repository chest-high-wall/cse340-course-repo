
import {
  getAllCategories,
  getCategoryDetails,
  getProjectsByCategoryId
} from "../models/categories.js";

// Display all categories
const showCategoriesPage = async (req, res, next) => {
  try {
    const categories = await getAllCategories();

    res.render("categories", {
      title: "Categories",
      categories
    });
  } catch (error) {
    next(error);
  }
};

// Display details for one category
const showCategoryDetailsPage = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    const categoryDetails = await getCategoryDetails(categoryId);

    if (!categoryDetails) {
      const error = new Error("Category Not Found");
      error.status = 404;
      return next(error);
    }

    const projects = await getProjectsByCategoryId(categoryId);

    res.render("category", {
      title: categoryDetails.name,
      categoryDetails,
      projects
    });
  } catch (error) {
    next(error);
  }
};

export {
  showCategoriesPage,
  showCategoryDetailsPage
};
