import { RowDataPacket } from "mysql2";
import { UsersRepository } from "../users-repository";
import { pool } from "../../database/config";
import { User } from "../../entities/user";

export class MysqlUsersRepository implements UsersRepository {
  async createUser(
    name: string,
    login: string,
    password: string,
  ): Promise<void> {
    await pool.execute(
      "INSERT INTO usuarios (nome, login, senha,criado_em,alterado_em) VALUES (?, ?, ?, NOW(), NOW())",
      [name, login, password],
    );
  }
  async findUserByLogin(login: string): Promise<User | undefined> {
    const [rows] = await pool.execute<(User & RowDataPacket)[]>(
      "SELECT * FROM usuarios WHERE login = ?",
      [login],
    );

    return rows[0];
  }
  async findUserById(id: number): Promise<User | undefined> {
    const [rows] = await pool.execute<(User & RowDataPacket)[]>(
      "SELECT id,  login FROM usuarios WHERE id = ?",
      [id],
    );

    return rows[0];
  }
}
