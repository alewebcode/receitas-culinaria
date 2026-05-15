import { MySQLRecipesRepository } from "../../repositories/mysql/mysql-recipes-repository";
import { GetRecipeUseCase } from "../get-recipe";

export function makeGetRecipesUseCase() {
  const recipesRepository = new MySQLRecipesRepository();
  const getRecipesUseCase = new GetRecipeUseCase(recipesRepository);

  return getRecipesUseCase;
}
