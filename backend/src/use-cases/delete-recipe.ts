import { RecipesRepository } from "../repositories/recipes-repository";

export class DeleteRecipeUseCase {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(id: number) {
    const recipeExists = await this.recipesRepository.findRecipeById(id);

    if (!recipeExists) {
      throw new Error("Receita não encontrada");
    }

    await this.recipesRepository.deleteRecipe(id);
  }
}
