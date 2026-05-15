import { makeGetRecipesUseCase } from "../use-cases/factories/make-get-recipes-use-case";
import { Request, Response } from "express";
import { mapRecipe } from "../utils/recipe-mapper";

export async function GetRecipeController(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const getRecipeUseCase = makeGetRecipesUseCase();

    const recipe = await getRecipeUseCase.execute(Number(id));

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    return res.status(200).json(mapRecipe(recipe));
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}
