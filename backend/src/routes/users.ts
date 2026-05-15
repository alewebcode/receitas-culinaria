import { GetMe } from "../controllers/get-me";
import { Register } from "../controllers/register";
import { Router } from "express";
import { verifyToken } from "../middlewares/verify-token";

const usersRouter = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cria um novo usuário
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
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 *       400:
 *         description: Erro de validação
 */
usersRouter.post("/", Register);
/**
 * @swagger
 * /users/me:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Busca o usuário logado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
usersRouter.get("/me", verifyToken, GetMe);

export { usersRouter };
