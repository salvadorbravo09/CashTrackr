import { Router } from "express";
import {
  createBudget,
  deleteBudgetById,
  getAllBudgets,
  getBudgetById,
  updateBudgetById,
} from "../controllers/budget.controller";
import {
  createBudgetValidation,
  getBudgetByIdValidation,
  updateBudgetByIdValidation,
} from "../validations/budget.validation";
import { handleInputValidation } from "../middleware/validation";

const router = Router();

// REST API
router.get("/", getAllBudgets);
router.get(
  "/:id",
  getBudgetByIdValidation,
  handleInputValidation,
  getBudgetById
);
router.post("/", createBudgetValidation, handleInputValidation, createBudget);
router.put("/:id", updateBudgetByIdValidation, handleInputValidation, updateBudgetById);
router.delete("/:id", deleteBudgetById);

export default router;
