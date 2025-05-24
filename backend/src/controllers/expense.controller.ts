import { Request, Response } from "express";
import Expense from "../models/Expense";

export const getExpenseById = async (req: Request, res: Response) => {
  res.status(200).json(req.expense);
};

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

export const updateExpenseById = async (req: Request, res: Response) => {
  try {
    await req.expense.update(req.body);
    res.status(200).json({ message: "Gasto actualizado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const deleteExpenseById = async (req: Request, res: Response) => {
  try {
    await req.expense.destroy();
    res.status(200).json({ message: "Gasto eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error" });
  }
};
