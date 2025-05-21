import { Request, Response, NextFunction } from "express";
import Budget from "../models/Budget";

declare global {
  namespace Express {
    interface Request {
      budget?: Budget;
    }
  }
}

export const checkBudgetExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findByPk(id);

    if (!budget) {
      res.status(404).json({ error: "Presupuesto no encontrado" });
      return;
    }

    // Añadimos el presupuesto al request para uso posterior
    req.budget = budget;
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};
