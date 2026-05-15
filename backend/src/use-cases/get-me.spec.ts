import { GetMeUseCase } from "./get-me";

describe("GetMeUseCase", () => {
  it("should return user without password", async () => {
    const usersRepository = {
      findUserById: jest.fn().mockResolvedValue({
        id: 1,
        login: "zezin",
      }),
    } as any;

    const getMeUseCase = new GetMeUseCase(usersRepository);

    const user = await getMeUseCase.execute(1);

    expect(user).not.toHaveProperty("password");
    expect(user).toEqual({ id: 1, login: "zezin" });
  });

  it("should throw if recipe not found", async () => {
    const usersRepository = {
      findUserById: jest.fn().mockResolvedValue(null),
    } as any;

    const getMeUseCase = new GetMeUseCase(usersRepository);

    await expect(getMeUseCase.execute(999)).rejects.toThrow(
      "Usuário não encontrado",
    );
  });
});
