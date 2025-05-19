import { Request, Response } from "express";
import Budget from "../models/Budget";

export const getAllBudgets = (req: Request, res: Response) => {
  console.log("desde GET /api/v1/budgets");
};

export const getBudgetById = (req: Request, res: Response) => {
  console.log("desde GET /api/v1/budgets/:id");
};

export const createBudget = async (req: Request, res: Response) => {
  try {
    const budget = new Budget(req.body);
    await budget.save();
    res.status(201).json({ message: "Presupuesto creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const updateBudgetById = (req: Request, res: Response) => {
  console.log("desde PUT /api/v1/budgets/:id");
};

export const deleteBudgetById = (req: Request, res: Response) => {
  console.log("desde DELETE /api/v1/budgets/:id");
};
