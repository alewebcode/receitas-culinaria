import { CreateRecipe } from "../controllers/create-recipe";
import { Router } from "express";
import { ListRecipes } from "../controllers/list-recipes";
import { UpdateRecipe } from "../controllers/update-recipe";
import { DeleteRecipe } from "../controllers/delete-recipe";
import { GetRecipeController } from "../controllers/get-recipe";
import { PrintRecipeController } from "../controllers/print-recipe";

const recipesRouter = Router();

/**
 * @swagger
 * /recipes:
 *   post:
 *     tags:
 *       - Receitas
 *     summary: Cria uma nova receita
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               categoryId:
 *                 type: number
 *               preparationTime:
 *                 type: number
 *               servings:
 *                 type: number
 *               preparationMethod:
 *                 type: string
 *               ingredients:
 *                 type: string
 *     responses:
 *       201:
 *         description: Receita criada
 *       400:
 *         description: Erro de validação
 */

recipesRouter.post("/", CreateRecipe);
/**
 * @swagger
 * /recipes:
 *   get:
 *     tags:
 *       - Receitas
 *     summary: Lista todas as receitas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de receitas
 *       401:
 *         description: Não autorizado
 */
recipesRouter.get("/", ListRecipes);
/**
 * @swagger
 * /recipes/{id}:
 *   put:
 *     tags:
 *       - Receitas
 *     summary: Atualiza uma receita
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID da receita
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               categoryId:
 *                 type: number
 *               preparationTime:
 *                 type: number
 *               servings:
 *                 type: number
 *               preparationMethod:
 *                 type: string
 *               ingredients:
 *                 type: string
 *     responses:
 *       200:
 *         description: Receita atualizada
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Receita não encontrada
 */

recipesRouter.put("/:id", UpdateRecipe);
/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     tags:
 *       - Receitas
 *     summary: Exclui uma receita
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID da receita
 *     responses:
 *       200:
 *         description: Receita excluída
 *       404:
 *         description: Receita não encontrada
 */

recipesRouter.delete("/:id", DeleteRecipe);
/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     tags:
 *       - Receitas
 *     summary: Busca uma receita
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID da receita
 *     responses:
 *       200:
 *         description: Receita encontrada
 *       404:
 *         description: Receita não encontrada
 */
recipesRouter.get("/:id", GetRecipeController);
/**
 * @swagger
 * /recipes/{id}/print:
 *   get:
 *     tags:
 *       - Receitas
 *     summary: Busca uma receita  para impressão
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID da receita
 *     responses:
 *       200:
 *         description: Receita encontrada
 *       404:
 *         description: Receita não encontrada
 */
recipesRouter.get("/:id/print", PrintRecipeController);

export { recipesRouter };
