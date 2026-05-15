import { authenticateRouter } from "./authenticate";
import { recipesRouter } from "./recipes";
import { usersRouter } from "./users";
import { Router } from "express";
import { verifyToken } from "../middlewares/verify-token";
import { categoriesRouter } from "./categories";

const router = Router();

router.use("/users", usersRouter);
router.use("/authenticate", authenticateRouter);
router.use("/recipes", verifyToken, recipesRouter);
router.use("/categories", verifyToken, categoriesRouter);

export { router };
