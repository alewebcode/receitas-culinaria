import { MysqlUsersRepository } from "../../repositories/mysql/mysql-users-repository";
import { AuthenticateUseCase } from "../users/authenticate";

export function makeAuthenticateUseCase() {
  const userRepository = new MysqlUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(userRepository);

  return authenticateUseCase;
}
