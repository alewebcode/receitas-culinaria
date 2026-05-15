import { Router } from "express";
import { ListCategories } from "../controllers/categories/list-categories";

const categoriesRouter = Router();
/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Categorias
 *     summary: Lista todas as categorias
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias
 *       400:
 *         description: Erro de validação
 */
categoriesRouter.get("/", ListCategories);

export { categoriesRouter };
