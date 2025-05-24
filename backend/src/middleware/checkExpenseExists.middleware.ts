import {Request, Response, NextFunction} from "express"
import Expense from "../models/Expense";

declare global {
  namespace Express {
    interface Request {
      expense?: Expense;
    }
  }
}

export const checkExpenseExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      res.status(404).json({ error: "Gasto no encontrado" });
      return;
    }

    req.expense = expense;
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};
