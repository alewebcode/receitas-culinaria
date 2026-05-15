import { AuthenticateUseCase } from "./authenticate";

describe("AuthenticateUseCase", () => {
  it("should authenticate a user with valid credentials", async () => {
    const usersRepository = {
      findUserByLogin: jest.fn().mockResolvedValue({
        id: 1,
        login: "johndoe",
        senha: "$2b$06$E8wWt/vPIv0UJ9EYRELh0uzzFR4JJ/7SO4lnowzLZgVIu2cRyqjEi",
      }),
    } as any;

    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    const result = await authenticateUseCase.execute({
      login: "johndoe",
      password: "123456",
    });

    expect(usersRepository.findUserByLogin).toHaveBeenCalledWith("johndoe");
    expect(result).toHaveProperty("token");
  });

  it("should not authenticate a user with invalid credentials", async () => {
    const usersRepository = {
      findUserByLogin: jest.fn().mockResolvedValue(null),
    } as any;

    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    await expect(
      authenticateUseCase.execute({
        login: "invaliduser",
        password: "wrongpassword",
      }),
    ).rejects.toThrow("Usuário ou senha inválidos");
    expect(usersRepository.findUserByLogin).toHaveBeenCalledWith("invaliduser");
  });
});
