import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  driver_license: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { };

  async execute({ name, email, driver_license, password }: IRequest): Promise<void> {
    await this.usersRepository.create({
      name,
      email,
      driver_license,
      password
    });
  }
}

export { CreateUserUseCase };
