import { Category } from "../entities/category";

export function mapRecipe(category: Category) {
  return {
    id: category.id,
    name: category.nome,
  };
}

export function mapRecipes(categories: Category[]) {
  return categories.map(mapRecipe);
}
