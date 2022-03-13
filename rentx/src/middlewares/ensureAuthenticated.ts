import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "01e6a6f7eda164d6690287774d2d67cc") as IPayload;

    const usersRepository = new UserRepository();

    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    req.user = {
      id: user_id
    }

    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}