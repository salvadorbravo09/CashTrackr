import { Router } from "express";
import {
  createBudget,
  deleteBudgetById,
  getAllBudgets,
  getBudgetById,
  updateBudgetById,
} from "../controllers/budget.controller";

const router = Router();

// REST API
router.get("/", getAllBudgets);
router.get("/:id", getBudgetById);
router.post("/", createBudget);
router.put("/:id", updateBudgetById);
router.delete("/:id", deleteBudgetById);

export default router;
