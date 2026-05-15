import { MySQLRecipesRepository } from "../../repositories/mysql/mysql-recipes-repository";
import { UpdateRecipesUseCase } from "../update-recipes";

export function makeUpdateRecipesUseCase() {
  const recipesRepository = new MySQLRecipesRepository();
  const updateRecipesUseCase = new UpdateRecipesUseCase(recipesRepository);

  return updateRecipesUseCase;
}
