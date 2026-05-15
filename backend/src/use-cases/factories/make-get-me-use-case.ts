import { MysqlUsersRepository } from "../../repositories/mysql/mysql-users-repository";
import { GetMeUseCase } from "../get-me";

export function makeGetMeUseCase() {
  const usersRepository = new MysqlUsersRepository();
  const getMeUseCase = new GetMeUseCase(usersRepository);

  return getMeUseCase;
}
