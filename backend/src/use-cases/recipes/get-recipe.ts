import { RecipesRepository } from "../../repositories/recipes-repository";

export class GetRecipeUseCase {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(recipeId: number, userId: number) {
    const recipe = await this.recipesRepository.findRecipeById(
      recipeId,
      userId,
    );

    if (!recipe) {
      throw new Error("Receita não encontrada");
    }

    return recipe;
  }
}
