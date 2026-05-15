import { Request, Response } from "express";
import { makeListCategoriesUseCase } from "../use-cases/factories/make-list-categories-use-case";
import { mapRecipes } from "../utils/category-mapper";

export async function ListCategories(req: Request, res: Response) {
  try {
    const listCategoriesUseCase = makeListCategoriesUseCase();

    const categories = await listCategoriesUseCase.execute();
    return res.status(200).json(mapRecipes(categories));
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}
