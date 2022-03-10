import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "../modules/cars/UseCases/CreateCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/UseCases/ImportCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/UseCases/ListCategories/ListCategoriesController";


const categoriesRoutes = Router();

const updload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post("/import", updload.single("file"), importCategoryController.handle);

export { categoriesRoutes };

