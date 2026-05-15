import { User } from "../entities/user";

export interface UsersRepository {
  createUser(name: string, login: string, password: string): Promise<void>;
  findUserByLogin(login: string): Promise<User | undefined>;
  findUserById(id: number): Promise<User | undefined>;
}
