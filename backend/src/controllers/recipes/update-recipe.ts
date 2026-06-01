import { Request, Response } from "express";
import z from "zod";
import { makeUpdateRecipesUseCase } from "../../use-cases/factories/make-update-recipes-use-case";

const updateRecipeSchema = z.object({
  categoryId: z.number().optional(),
  name: z.string().min(3).optional(),
  preparationTime: z.number().positive().optional(),
  servings: z.number().positive().optional(),
  preparationMethod: z.string().min(1).optional(),
  ingredients: z.string().optional(),
});

export async function UpdateRecipe(req: Request, res: Response) {
  const { id } = req.params;
  const { id: userId } = (req as any).user;

  const parsed = updateRecipeSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      errors: parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  try {
    const updateRecipesUseCase = makeUpdateRecipesUseCase();

    const recipe = await updateRecipesUseCase.execute({
      id: Number(id),
      userId,
      ...parsed.data,
    });
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}
