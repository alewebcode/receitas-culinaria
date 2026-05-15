import { Category } from "../entities/category";

export interface CategoriesRepository {
  findCategories(): Promise<Category[]>;
}
