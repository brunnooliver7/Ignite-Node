import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  constructor(private importcategoryusecase: ImportCategoryUseCase) {}

  handle(req: Request, res: Response): Response {
    const { file } = req;
    this.importcategoryusecase.execute(file);
    return res.send();
  }
}

export { ImportCategoryController };