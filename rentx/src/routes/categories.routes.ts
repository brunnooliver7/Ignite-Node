import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/UseCases/CreateCategory/CreateCategoryController";
import importCategoryController from "../modules/cars/UseCases/ImportCategory";
import listCategoriesController from "../modules/cars/UseCases/ListCategories";

const categoriesRoutes = Router();

const updload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", (req, res) => {
  return listCategoriesController().handle(req, res);
});

categoriesRoutes.post("/import", updload.single("file"), (req, res) => {
  return importCategoryController().handle(req, res);
});

export { categoriesRoutes };
