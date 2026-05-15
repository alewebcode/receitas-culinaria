import { RecipesRepository } from "../repositories/recipes-repository";

interface CreateRecipeRequest {
  userId: number;
  categoryId: number;
  name: string;
  preparationTime?: number | undefined;
  servings?: number | undefined;
  preparationMethod: string;
  ingredients?: string | undefined;
}

export class CreateRecipeUseCase {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute({ userId, ...data }: CreateRecipeRequest) {
    const recipe = await this.recipesRepository.createRecipe({
      id_usuarios: userId,
      id_categorias: data.categoryId,
      nome: data.name,
      tempo_preparo_minutos: data.preparationTime ?? null,
      porcoes: data.servings ?? null,
      modo_preparo: data.preparationMethod,
      ingredientes: data.ingredients ?? null,
    });

    return recipe;
  }
}
