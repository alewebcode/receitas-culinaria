import { Request, Response } from "express";
import { mapCategories } from "../../utils/category-mapper";
import { makeListCategoriesUseCase } from "../../use-cases/factories/make-list-categories-use-case";

export async function ListCategories(req: Request, res: Response) {
  try {
    const listCategoriesUseCase = makeListCategoriesUseCase();

    const categories = await listCategoriesUseCase.execute();
    return res.status(200).json(mapCategories(categories));
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}
