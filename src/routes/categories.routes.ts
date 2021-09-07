import { Router } from "express";

import { createCategoryController } from "../modules/cars/UseCases/CreateCategory";
import { listCategoriesController } from "../modules/cars/UseCases/ListCategories";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (req, res) => {
    return createCategoryController.handle(req, res);
});

categoriesRoutes.get("/", (req, res) => {
    return listCategoriesController.handle(req, res);
});

export { categoriesRoutes };
