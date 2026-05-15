import { RecipesRepository } from "../../repositories/recipes-repository";

interface UpdateRecipeRequest {
  id: number;
  categoryId?: number | undefined;
  name?: string | undefined;
  preparationTime?: number | undefined;
  servings?: number | undefined;
  preparationMethod?: string | undefined;
  ingredients?: string | undefined;
}

export class UpdateRecipesUseCase {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute({ id, ...data }: UpdateRecipeRequest) {
    const recipe = await this.recipesRepository.findRecipeById(id);

    if (!recipe) {
      throw new Error("Receita não encontrada");
    }

    const updateRecipe = await this.recipesRepository.updateRecipe({
      id,
      id_usuarios: recipe.id_usuarios,
      id_categorias: data.categoryId ?? recipe.id_categorias,
      nome: data.name ?? recipe.nome,
      tempo_preparo_minutos:
        data.preparationTime ?? recipe.tempo_preparo_minutos,
      porcoes: data.servings ?? recipe.porcoes,
      modo_preparo: data.preparationMethod ?? recipe.modo_preparo,
      ingredientes: data.ingredients ?? recipe.ingredientes,
    });

    return updateRecipe;
  }
}
