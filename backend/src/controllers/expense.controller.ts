import { Request, Response } from "express";
import Expense from "../models/Expense";

export const getExpenseById = async (req: Request, res: Response) => {};

export const createExpense = async (req: Request, res: Response) => {
  try {
    const expense = new Expense(req.body);
    expense.budgetId = req.budget.id;
    await expense.save();
    res.status(201).json({ message: "Gasto agregado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const updateExpenseById = async (req: Request, res: Response) => {};

export const deleteExpenseById = async (req: Request, res: Response) => {};
