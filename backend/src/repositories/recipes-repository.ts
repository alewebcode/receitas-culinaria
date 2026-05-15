import { Recipe } from "../entities/recipe";

export interface RecipesRepository {
  createRecipe(recipe: Omit<Recipe, "id">): Promise<Recipe>;
  findRecipeById(id: number): Promise<Recipe | undefined>;
  findRecipes(userId: number): Promise<Recipe[]>;
  deleteRecipe(id: number): Promise<void>;
  updateRecipe(recipe: Recipe): Promise<void>;
  searchRecipes(query: string, userId: number): Promise<Recipe[]>;
}
