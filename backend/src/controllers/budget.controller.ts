import { Request, Response } from "express";
import Budget from "../models/Budget";
import Expense from "../models/Expense";

export const getAllBudgets = async (req: Request, res: Response) => {
  try {
    const budgets = await Budget.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        userId: req.user.id, // Filtra los presupuestos por el ID del usuario autenticado
      },
    });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const getBudgetById = async (req: Request, res: Response) => {
  const budget = await Budget.findByPk(req.budget.id, {
    include: [Expense],
  });

  res.status(200).json(budget);
};

export const createBudget = async (req: Request, res: Response) => {
  try {
    const budget = new Budget(req.body);
    budget.userId = req.user.id; // Asignar el ID del usuario autenticado
    await budget.save();
    res.status(201).json({ message: "Presupuesto creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const updateBudgetById = async (req: Request, res: Response) => {
  await req.budget.update(req.body);
  res.status(200).json({ message: "Presupuesto actualizado correctamente" });
};

export const deleteBudgetById = async (req: Request, res: Response) => {
  await req.budget.destroy();
  res.status(200).json({ message: "Presupuesto eliminado correctamente" });
};
