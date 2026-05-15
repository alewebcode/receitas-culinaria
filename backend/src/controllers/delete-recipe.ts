import { Request, Response } from "express";
import { makeDeleteRecipesUseCase } from "../use-cases/factories/make-delete-recipes-use-case";

export async function DeleteRecipe(req: Request, res: Response) {
  const { id } = req.params;
  const deleteRecipesUseCase = makeDeleteRecipesUseCase();

  try {
    await deleteRecipesUseCase.execute(Number(id));
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}
