import { Request, Response } from "express";
import { makeSearchRecipesUseCase } from "../../use-cases/factories/make-search-recipes-use-case";
import { mapRecipes } from "../../utils/recipe-mapper";
import { makeListRecipesUseCase } from "../../use-cases/factories/make-list-recipes-use-case";

export async function ListRecipes(req: Request, res: Response) {
  const { search } = req.query;
  const { id } = (req as any).user;

  try {
    const userId = id;
    if (search) {
      const searchRecipesUseCase = makeSearchRecipesUseCase();

      const recipes = await searchRecipesUseCase.execute({
        search: String(search),
        userId,
      });
      return res.status(200).json(mapRecipes(recipes));
    }

    const listRecipesUseCase = makeListRecipesUseCase();

    const recipes = await listRecipesUseCase.execute(userId);
    return res.status(200).json(mapRecipes(recipes));
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}
