import { Request, Response } from "express";
import Budget from "../models/Budget";

export const getAllBudgets = async (req: Request, res: Response) => {
  try {
    const budgets = await Budget.findAll({
      order: [["createdAt", "DESC"]],
      // TODO: Filtrar por el usuario autenticado
    });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const getBudgetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findByPk(id);
    if (!budget) {
      res.status(404).json({ error: "Presupuesto no encontrado" });
      return;
    }
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const createBudget = async (req: Request, res: Response) => {
  try {
    const budget = new Budget(req.body);
    await budget.save();
    res.status(201).json({ message: "Presupuesto creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
    return;
  }
};

export const updateBudgetById = (req: Request, res: Response) => {
  console.log("desde PUT /api/v1/budgets/:id");
};

export const deleteBudgetById = (req: Request, res: Response) => {
  console.log("desde DELETE /api/v1/budgets/:id");
};
