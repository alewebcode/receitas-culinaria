import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface Payload extends JwtPayload {
  userId: number;
  login: string;
}

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Payload;

    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
}
