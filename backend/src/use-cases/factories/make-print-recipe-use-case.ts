import { MySQLRecipesRepository } from "../../repositories/mysql/mysql-recipes-repository";
import { PrintRecipeUseCase } from "../recipes/print-recipe";

export function makePrintRecipeUseCase() {
  const recipesRepository = new MySQLRecipesRepository();
  const printRecipeUseCase = new PrintRecipeUseCase(recipesRepository);

  return printRecipeUseCase;
}
