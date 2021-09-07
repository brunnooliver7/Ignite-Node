import { Router } from "express";

import { createSpecificationController } from "../modules/cars/UseCases/CreateSpecification";
import { listSpecificationsController } from "../modules/cars/UseCases/ListSpecifications";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req, res) => {
    return createSpecificationController.handle(req, res);
});

specificationsRoutes.get("/", (req, res) => {
    return listSpecificationsController.handle(req, res);
});

export { specificationsRoutes };
