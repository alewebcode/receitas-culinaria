import { CreateRecipeUseCase } from "../recipes/create-recipe";

describe("CreateRecipeUseCase", () => {
  it("should create a new recipe", async () => {
    const recipesRepository = {
      createRecipe: jest.fn(),
    } as any;

    const createRecipeUseCase = new CreateRecipeUseCase(recipesRepository);

    await createRecipeUseCase.execute({
      userId: 1,
      categoryId: 1,
      name: "Bolo de chocolate",
      preparationTime: 30,
      servings: 4,
      preparationMethod:
        "Misture os ingredientes e leve ao forno por 30 minutos",
      ingredients: "Farinha, açúcar, ovos, chocolate em pó",
    });

    expect(recipesRepository.createRecipe).toHaveBeenCalledTimes(1);
  });
});
