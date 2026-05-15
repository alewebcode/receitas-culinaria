import { MySQLRecipesRepository } from "../../repositories/mysql/mysql-recipes-repository";
import { UpdateRecipesUseCase } from "../recipes/update-recipes";

export function makeUpdateRecipesUseCase() {
  const recipesRepository = new MySQLRecipesRepository();
  const updateRecipesUseCase = new UpdateRecipesUseCase(recipesRepository);

  return updateRecipesUseCase;
}
