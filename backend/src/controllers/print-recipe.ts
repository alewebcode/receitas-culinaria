import { Request, Response } from "express";
import { makePrintRecipeUseCase } from "../use-cases/factories/make-print-recipe-use-case";

export async function PrintRecipeController(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const printRecipeUseCase = makePrintRecipeUseCase();

    const recipe = await printRecipeUseCase.execute(Number(id));

    if (!recipe) {
      return res.status(404).json({ message: "Receita não encontrada" });
    }
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}
