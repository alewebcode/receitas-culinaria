import { RowDataPacket } from "mysql2";
import { pool } from "../../database/config";
import { Recipe } from "../../entities/recipe";
import { RecipesRepository } from "../recipes-repository";

export class MySQLRecipesRepository implements RecipesRepository {
  async createRecipe({
    id_usuarios,
    id_categorias,
    nome,
    tempo_preparo_minutos,
    porcoes,
    modo_preparo,
    ingredientes,
  }: Recipe): Promise<Recipe> {
    const [result] = await pool.execute(
      "INSERT INTO receitas (id_usuarios, id_categorias, nome, tempo_preparo_minutos, porcoes, modo_preparo, ingredientes,criado_em,alterado_em) VALUES (?, ?, ?, ?, ?, ?, ?,NOW(),NOW())",
      [
        id_usuarios,
        id_categorias,
        nome,
        tempo_preparo_minutos,
        porcoes,
        modo_preparo,
        ingredientes,
      ],
    );

    return {
      id: (result as any).insertId,
      id_usuarios,
      id_categorias,
      nome,
      tempo_preparo_minutos,
      porcoes,
      modo_preparo,
      ingredientes,
    };
  }

  async findRecipeById(id: number): Promise<Recipe | undefined> {
    const [rows] = await pool.execute<(Recipe & RowDataPacket)[]>(
      "SELECT id, id_usuarios, id_categorias, nome, tempo_preparo_minutos, porcoes, modo_preparo, ingredientes FROM receitas WHERE id = ?",
      [id],
    );

    return rows[0];
  }
  async findRecipes(userId: number): Promise<Recipe[]> {
    const [rows] = await pool.execute<(Recipe & RowDataPacket)[]>(
      "SELECT r.id,c.nome as categoria, r.nome, r.tempo_preparo_minutos, r.porcoes, r.modo_preparo, r.ingredientes FROM receitas r inner join categorias c on r.id_categorias = c.id WHERE r.id_usuarios = ?",
      [userId],
    );

    return rows;
  }
  async deleteRecipe(id: number): Promise<void> {
    await pool.execute("DELETE FROM receitas WHERE id = ?", [id]);
  }
  async updateRecipe(recipe: Recipe): Promise<void> {
    const recipeToUpdate = await this.findRecipeById(recipe.id);

    if (!recipeToUpdate) {
      throw new Error("Receita não encontrada");
    }

    await pool.execute(
      "UPDATE receitas SET  id_categorias = ?, nome = ?, tempo_preparo_minutos = ?, porcoes = ?, modo_preparo = ?, ingredientes = ?, alterado_em = NOW() WHERE id = ?",
      [
        recipe.id_categorias,
        recipe.nome,
        recipe.tempo_preparo_minutos,
        recipe.porcoes,
        recipe.modo_preparo,
        recipe.ingredientes,
        recipe.id,
      ],
    );
  }
  async searchRecipes(search: string, userId: number): Promise<Recipe[]> {
    const [rows] = await pool.execute<(Recipe & RowDataPacket)[]>(
      `SELECT r.id, c.nome as categoria, r.nome, r.tempo_preparo_minutos, r.porcoes, r.modo_preparo, r.ingredientes 
     FROM receitas r 
     INNER JOIN categorias c ON r.id_categorias = c.id 
     WHERE r.id_usuarios = ? 
     AND r.nome LIKE ?`,
      [userId, `%${search}%`],
    );

    return rows;
  }
}
