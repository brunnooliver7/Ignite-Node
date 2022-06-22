import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    const autenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    const token = await autenticateUserUseCase.execute({ email, password });
    return res.json(token);
  }
}

export { AuthenticateUserController };