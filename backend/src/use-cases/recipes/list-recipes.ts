import { Recipe } from "../../entities/recipe";
import { RecipesRepository } from "../../repositories/recipes-repository";

export class ListRecipesUseCase {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(userId: number): Promise<Recipe[]> {
    const recipes = await this.recipesRepository.findRecipes(userId);

    return recipes;
  }
}
