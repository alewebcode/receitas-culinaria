import { Recipe } from "../entities/recipe";

export function mapRecipe(recipe: Recipe) {
  return {
    id: recipe.id,
    name: recipe.nome,
    categoryId: recipe.id_categorias,
    category: recipe.categoria,
    preparationTime: recipe.tempo_preparo_minutos,
    servings: recipe.porcoes,
    preparationMethod: recipe.modo_preparo,
    ingredients: recipe.ingredientes,
  };
}

export function mapRecipes(recipes: Recipe[]) {
  return recipes.map(mapRecipe);
}
