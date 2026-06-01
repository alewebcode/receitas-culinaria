import { RecipesRepository } from "../../repositories/recipes-repository";

export class PrintRecipeUseCase {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(recipeId: number, userId: number) {
    const recipeExists = await this.recipesRepository.findRecipeById(
      recipeId,
      userId,
    );

    if (!recipeExists) {
      throw new Error("Receita não encontrada");
    }

    const recipe = await this.recipesRepository.findRecipeById(
      recipeId,
      userId,
    );

    return recipe;
  }
}
