import { MySQLCategoriesRepository } from "../../repositories/mysql/mysql-categories-repository";
import { ListCategoriesUseCase } from "../categories/list-categories";

export function makeListCategoriesUseCase() {
  const recipesRepository = new MySQLCategoriesRepository();
  const listCategoriesUseCase = new ListCategoriesUseCase(recipesRepository);

  return listCategoriesUseCase;
}
