import { hash } from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(data: { name: string; login: string; password: string }) {
    const userExists = await this.userRepository.findUserByLogin(data.login);
    if (userExists) {
      throw new Error("Login já existe");
    }

    const passwordHash = await hash(data.password, 6);

    await this.userRepository.createUser(data.name, data.login, passwordHash);
  }
}
