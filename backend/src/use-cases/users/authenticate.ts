import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UsersRepository } from "../../repositories/users-repository";

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}
  async execute(data: { login: string; password: string }) {
    const user = await this.userRepository.findUserByLogin(data.login);
    if (!user) {
      throw new Error("Usuário ou senha inválidos");
    }

    const comparePassword = await bcrypt.compare(data.password, user.senha);

    if (!comparePassword) {
      throw new Error("Usuário ou senha inválidos");
    }

    const payload = {
      id: user.id,
      login: user.login,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return {
      user: {
        id: user.id,
        login: user.login,
      },
      token,
    };
  }
}
