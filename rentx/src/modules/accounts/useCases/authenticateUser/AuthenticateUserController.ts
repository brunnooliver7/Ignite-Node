import { Request, Response } from "express";
import { container } from "tsyringe";
import { AutenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    const autenticateUserUseCase = container.resolve(AutenticateUserUseCase);
    const token = await autenticateUserUseCase.execute({ email, password });
    return res.json(token);
  }
}

export { AuthenticateUserController };