import { Router } from "express";
import { createBudget, getAllBudgets } from "../controllers/budget.controller";

const router = Router();

router.get("/", getAllBudgets);
router.post("/", createBudget);

export default router;
