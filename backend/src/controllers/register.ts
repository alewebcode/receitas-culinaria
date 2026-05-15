import { Request, Response } from "express";
import { makeRegisterUseCase } from "../use-cases/factories/make-register-use-case";
import z from "zod";

const registerSchema = z.object({
  name: z.string().min(3),
  login: z.string().min(3),
  password: z.string().min(6),
});

export async function Register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      errors: parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute(parsed.data);
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }

  return res.status(201).send();
}
