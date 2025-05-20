import { Router } from "express";
import {
  createBudget,
  deleteBudgetById,
  getAllBudgets,
  getBudgetById,
  updateBudgetById,
} from "../controllers/budget.controller";
import { createBudgetValidation } from "../validations/budget.validation";
import { handleInputValidation } from "../middleware/validation";

const router = Router();

// REST API
router.get("/", getAllBudgets);
router.get("/:id", getBudgetById);
router.post("/", createBudgetValidation, handleInputValidation, createBudget);
router.put("/:id", updateBudgetById);
router.delete("/:id", deleteBudgetById);

export default router;
