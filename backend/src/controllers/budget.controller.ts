import { Request, Response } from "express";

export const getAllBudgets = (req: Request, res: Response) => {
  console.log("desde GET /api/v1/budgets");
};

export const createBudget = (req: Request, res: Response) => {
  console.log("desde POST /api/v1/budgets/create");
};
