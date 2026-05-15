import { Recipe } from "../entities/recipe";
import { RecipesRepository } from "../repositories/recipes-repository";

interface SearchRecipesUseCaseRequest {
  search: string;
  userId: number;
}

export class SearchRecipesUseCase {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute({
    search,
    userId,
  }: SearchRecipesUseCaseRequest): Promise<Recipe[]> {
    const recipes = await this.recipesRepository.searchRecipes(search, userId);

    return recipes;
  }
}
