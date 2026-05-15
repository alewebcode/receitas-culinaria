import { RegisterUseCase } from "./register";

describe("RegisterUseCase", () => {
  it("should create a new user", async () => {
    const usersRepository = {
      createUser: jest.fn(),
      findUserByLogin: jest.fn(),
    } as any;

    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({
      name: "John Doe",
      login: "johndoe",
      password: "123456",
    });

    expect(usersRepository.createUser).toHaveBeenCalledTimes(1);
  });

  it("should not create a user with an existing login", async () => {
    const usersRepository = {
      createUser: jest.fn(),
      findUserByLogin: jest.fn().mockResolvedValue({ id: 1, login: "johndoe" }),
    } as any;

    const registerUseCase = new RegisterUseCase(usersRepository);

    await expect(
      registerUseCase.execute({
        name: "John Doe",
        login: "johndoe",
        password: "123456",
      }),
    ).rejects.toThrow("Login já existe");

    expect(usersRepository.createUser).not.toHaveBeenCalled();
  });
});
