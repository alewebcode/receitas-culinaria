import { UsersRepository } from "../repositories/users-repository";

export class GetMeUseCase {
  constructor(private users: UsersRepository) {}

  async execute(userId: number) {
    const user = await this.users.findUserById(userId);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }
}
