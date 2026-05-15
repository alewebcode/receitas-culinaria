import { Request, Response } from "express";
import { makeAuthenticateUseCase } from "../use-cases/factories/make-authenticate-use-case";

export async function Authenticate(req: Request, res: Response) {
  const { login, password } = req.body;
  const authenticateUseCase = makeAuthenticateUseCase();

  try {
    const user = await authenticateUseCase.execute({ login, password });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}
