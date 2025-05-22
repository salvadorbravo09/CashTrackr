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
  deleteBudgetByIdValidation,
  getBudgetByIdValidation,
  updateBudgetByIdValidation,
} from "../validations/budget.validation";
import { handleInputValidation } from "../middleware/validation";
import { checkBudgetExists } from "../middleware/checkBudgetExists.middleware";
import { createExpense, deleteExpenseById, getAllExpenses, getExpenseById, updateExpenseById } from "../controllers/expense.controller";

const router = Router();

// REST API
router.get("/", getAllBudgets);

router.get(
  "/:id",
  getBudgetByIdValidation,
  checkBudgetExists,
  handleInputValidation,
  getBudgetById
);

router.post("/", createBudgetValidation, handleInputValidation, createBudget);

router.put(
  "/:id",
  updateBudgetByIdValidation,
  checkBudgetExists,
  handleInputValidation,
  updateBudgetById
);

router.delete(
  "/:id",
  deleteBudgetByIdValidation,
  checkBudgetExists,
  handleInputValidation,
  deleteBudgetById
);

// Routes for expenses
router.get("/:id/expenses", getAllExpenses);
router.get("/:id/expenses/:expenseId", getExpenseById);
router.post("/:id/expenses", createExpense);
router.put("/:id/expenses/:expenseId", updateExpenseById);
router.delete("/:id/expenses/:expenseId", deleteExpenseById);


export default router;
