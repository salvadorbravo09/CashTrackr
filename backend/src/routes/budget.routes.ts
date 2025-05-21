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
  handleInputValidation,
  deleteBudgetById
);

export default router;
