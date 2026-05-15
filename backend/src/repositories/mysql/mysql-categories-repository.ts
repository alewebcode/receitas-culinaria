import { RowDataPacket } from "mysql2";
import { pool } from "../../database/config";
import { CategoriesRepository } from "../categories-repository";
import { Category } from "../../entities/category";

export class MySQLCategoriesRepository implements CategoriesRepository {
  async findCategories(): Promise<Category[]> {
    const [rows] = await pool.execute<(Category & RowDataPacket)[]>(
      "SELECT id, nome FROM categorias",
    );

    return rows;
  }
}
