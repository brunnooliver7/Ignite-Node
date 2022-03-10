import { Router } from "express";
import { CreateSpecificationController } from "../modules/cars/UseCases/CreateSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../modules/cars/UseCases/ListSpecifications/ListSpecificationsController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post("/", (req, res) => {
  return createSpecificationController.handle(req, res);
});

specificationsRoutes.get("/", (req, res) => {
  return listSpecificationsController.handle(req, res);
});

export { specificationsRoutes };

