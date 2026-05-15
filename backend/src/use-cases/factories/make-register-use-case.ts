import { MysqlUsersRepository } from "../../repositories/mysql/mysql-users-repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
  const userRepository = new MysqlUsersRepository();
  const registerUseCase = new RegisterUseCase(userRepository);

  return registerUseCase;
}
