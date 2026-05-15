import { Category } from "../entities/category";

export function mapCategory(category: Category) {
  return {
    id: category.id,
    name: category.nome,
  };
}

export function mapCategories(categories: Category[]) {
  return categories.map(mapCategory);
}
