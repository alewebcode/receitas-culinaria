import { UpdateRecipesUseCase } from "../recipes/update-recipes";

describe("UpdateRecipeUseCase", () => {
  it("should update an existing recipe", async () => {
    const recipesRepository = {
      updateRecipe: jest.fn(),
      findRecipeById: jest.fn().mockResolvedValue({
        id: 1,
      }),
    } as any;

    const updateRecipeUseCase = new UpdateRecipesUseCase(recipesRepository);

    await updateRecipeUseCase.execute({
      id: 1,
      categoryId: 2,
      name: "Bolo de cenoura",
      preparationTime: 40,
      servings: 6,
      preparationMethod:
        "Misture os ingredientes e leve ao forno por 40 minutos",
      ingredients: "Farinha, açúcar, ovos, cenoura",
    });

    expect(recipesRepository.updateRecipe).toHaveBeenCalledTimes(1);
  });
  it("should throw if recipe not found", async () => {
    const recipesRepository = {
      updateRecipe: jest.fn(),
      findRecipeById: jest.fn().mockResolvedValue(null),
    } as any;

    const updateRecipeUseCase = new UpdateRecipesUseCase(recipesRepository);

    await expect(
      updateRecipeUseCase.execute({
        id: 999,
        categoryId: 2,
        name: "Bolo de cenoura",
        preparationTime: 40,
        servings: 6,
        preparationMethod:
          "Misture os ingredientes e leve ao forno por 40 minutos",
        ingredients: "Farinha, açúcar, ovos, cenoura",
      }),
    ).rejects.toThrow("Receita não encontrada");

    expect(recipesRepository.updateRecipe).not.toHaveBeenCalled();
  });
});
