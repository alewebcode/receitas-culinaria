import { MySQLRecipesRepository } from "../../repositories/mysql/mysql-recipes-repository";
import { ListRecipesUseCase } from "../recipes/list-recipes";

export function makeListRecipesUseCase() {
  const recipesRepository = new MySQLRecipesRepository();
  const listRecipesUseCase = new ListRecipesUseCase(recipesRepository);

  return listRecipesUseCase;
}
