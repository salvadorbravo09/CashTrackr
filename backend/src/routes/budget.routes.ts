import { checkBudgetExists } from "./../middleware/checkBudgetExists.middleware";
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
import {
  createExpense,
  deleteExpenseById,
  getExpenseById,
  updateExpenseById,
} from "../controllers/expense.controller";
import {
  createExpenseValidation,
  validateExpenseId,
  updateExpenseValidation,
  deleteExpenseValidation,
} from "../validations/expense.validation";
import { checkExpenseExists } from "../middleware/checkExpenseExists.middleware";
import { authenticate } from "../middleware/auth";
import { hasAccess } from "../middleware/hasAccess.middleware";

const router = Router();

router.use(authenticate);

// REST API
router.get("/", getAllBudgets);

router.get(
  "/:budgetId",
  getBudgetByIdValidation,
  checkBudgetExists,
  hasAccess,
  handleInputValidation,
  getBudgetById
);

router.post("/", createBudgetValidation, handleInputValidation, createBudget);

router.put(
  "/:budgetId",
  updateBudgetByIdValidation,
  checkBudgetExists,
  hasAccess,
  handleInputValidation,
  updateBudgetById
);

router.delete(
  "/:budgetId",
  deleteBudgetByIdValidation,
  checkBudgetExists,
  hasAccess,
  handleInputValidation,
  deleteBudgetById
);

// Routes for expenses
router.post(
  "/:budgetId/expenses",
  checkBudgetExists,
  hasAccess,
  createExpenseValidation,
  handleInputValidation,
  createExpense
);

router.get(
  "/:budgetId/expenses/:expenseId",
  checkBudgetExists,
  hasAccess,
  checkExpenseExists,
  validateExpenseId,
  handleInputValidation,
  getExpenseById
);

router.put(
  "/:budgetId/expenses/:expenseId",
  checkBudgetExists,
  hasAccess,
  checkExpenseExists,
  updateExpenseValidation,
  handleInputValidation,
  updateExpenseById
);

router.delete(
  "/:budgetId/expenses/:expenseId",
  checkBudgetExists,
  hasAccess,
  checkExpenseExists,
  deleteExpenseValidation,
  handleInputValidation,
  deleteExpenseById
);

export default router;
