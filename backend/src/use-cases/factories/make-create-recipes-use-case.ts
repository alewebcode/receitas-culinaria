import { MySQLRecipesRepository } from "../../repositories/mysql/mysql-recipes-repository";
import { CreateRecipeUseCase } from "../recipes/create-recipe";

export function makeCreateRecipesUseCase() {
  const recipesRepository = new MySQLRecipesRepository();
  const createRecipesUseCase = new CreateRecipeUseCase(recipesRepository);

  return createRecipesUseCase;
}
