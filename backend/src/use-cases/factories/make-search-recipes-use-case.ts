import { MySQLRecipesRepository } from "../../repositories/mysql/mysql-recipes-repository";
import { SearchRecipesUseCase } from "../search-recipes";

export function makeSearchRecipesUseCase() {
  const recipesRepository = new MySQLRecipesRepository();
  const searchRecipesUseCase = new SearchRecipesUseCase(recipesRepository);

  return searchRecipesUseCase;
}
