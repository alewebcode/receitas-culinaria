import { Request, Response } from "express";
import { makeCreateRecipesUseCase } from "../use-cases/factories/make-create-recipes-use-case";
import z from "zod";
import { mapRecipe } from "../utils/recipe-mapper";

const createRecipeSchema = z.object({
  categoryId: z.number(),
  name: z.string().min(3),
  preparationTime: z.number().positive().optional(),
  servings: z.number().positive().optional(),
  preparationMethod: z.string().min(1),
  ingredients: z.string().optional(),
});

export async function CreateRecipe(req: Request, res: Response) {
  const parsed = createRecipeSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      errors: parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }
  try {
    const createRecipeUseCase = makeCreateRecipesUseCase();

    const recipe = await createRecipeUseCase.execute({
      userId: (req as any).user.id,
      ...parsed.data,
    });
    return res.status(201).json(mapRecipe(recipe));
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}
