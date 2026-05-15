import { DeleteRecipeUseCase } from "./delete-recipe";

describe("DeleteRecipeUseCase", () => {
  it("should delete an existing recipe", async () => {
    const recipesRepository = {
      deleteRecipe: jest.fn(),
      findRecipeById: jest.fn().mockResolvedValue({
        id: 1,
      }),
    } as any;

    const deleteRecipeUseCase = new DeleteRecipeUseCase(recipesRepository);

    await deleteRecipeUseCase.execute(1);

    expect(recipesRepository.deleteRecipe).toHaveBeenCalledTimes(1);
  });

  it("should throw if recipe not found", async () => {
    const recipesRepository = {
      deleteRecipe: jest.fn(),
      findRecipeById: jest.fn().mockResolvedValue(null),
    } as any;

    const deleteRecipeUseCase = new DeleteRecipeUseCase(recipesRepository);

    await expect(deleteRecipeUseCase.execute(999)).rejects.toThrow(
      "Receita não encontrada",
    );

    expect(recipesRepository.deleteRecipe).not.toHaveBeenCalled();
  });
});
