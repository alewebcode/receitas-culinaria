import { Request, Response } from "express";
import { makeGetMeUseCase } from "../../use-cases/factories/make-get-me-use-case";

export async function GetMe(req: Request, res: Response) {
  const { id } = (req as any).user;

  try {
    const getMeUseCase = makeGetMeUseCase();

    const user = await getMeUseCase.execute(id);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}
