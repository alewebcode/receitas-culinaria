import { Authenticate } from "../controllers/authenticate";
import { Router } from "express";

const authenticateRouter = Router();
/**
 * @swagger
 * /authenticate:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Autenticação do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário autenticado
 *       401:
 *         description: Credenciais inválidas
 */
authenticateRouter.post("/", Authenticate);

export { authenticateRouter };
