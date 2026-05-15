import { MySQLRecipesRepository } from "../../repositories/mysql/mysql-recipes-repository";
import { DeleteRecipeUseCase } from "../recipes/delete-recipe";

export function makeDeleteRecipesUseCase() {
  const recipesRepository = new MySQLRecipesRepository();
  const deleteRecipesUseCase = new DeleteRecipeUseCase(recipesRepository);

  return deleteRecipesUseCase;
}
