import { GetRecipeUseCase } from "../recipes/get-recipe";

describe("GetRecipeUseCase", () => {
  it("should get a recipe by id", async () => {
    const recipesRepository = {
      findRecipeById: jest.fn().mockResolvedValue({
        id: 1,
        name: "Bolo de chocolate",
        categoryId: 1,
        preparationTime: 30,
        servings: 4,
        preparationMethod:
          "Misture os ingredientes e leve ao forno por 30 minutos",
        ingredients: "Farinha, açúcar, ovos, chocolate em pó",
      }),
    } as any;

    const getRecipeUseCase = new GetRecipeUseCase(recipesRepository);

    const recipe = await getRecipeUseCase.execute(1);

    expect(recipe).toEqual({
      id: 1,
      name: "Bolo de chocolate",
      categoryId: 1,
      preparationTime: 30,
      servings: 4,
      preparationMethod:
        "Misture os ingredientes e leve ao forno por 30 minutos",
      ingredients: "Farinha, açúcar, ovos, chocolate em pó",
    });
  });

  it("should throw if recipe not found", async () => {
    const recipesRepository = {
      findRecipeById: jest.fn().mockResolvedValue(null),
    } as any;

    const getRecipeUseCase = new GetRecipeUseCase(recipesRepository);

    await expect(getRecipeUseCase.execute(999)).rejects.toThrow(
      "Receita não encontrada",
    );
  });
});
