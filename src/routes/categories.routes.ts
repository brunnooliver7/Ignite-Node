import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/UseCases/CreateCategory";
import { importCategoryController } from "../modules/cars/UseCases/ImportCategory";
import { listCategoriesController } from "../modules/cars/UseCases/ListCategories";

const categoriesRoutes = Router();

const updload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get("/", (req, res) => {
  return listCategoriesController.handle(req, res);
});

categoriesRoutes.post("/import", updload.single("file"), (req, res) => {
  return importCategoryController.handle(req, res);
});

export { categoriesRoutes };
