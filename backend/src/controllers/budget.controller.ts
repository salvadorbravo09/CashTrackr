import { Request, Response } from "express";

export const getAllBudgets = (req: Request, res: Response) => {
  console.log("desde GET /api/v1/budgets");
};

export const getBudgetById = (req: Request, res: Response) => {
  console.log("desde GET /api/v1/budgets/:id");
};

export const createBudget = (req: Request, res: Response) => {
  console.log("desde POST /api/v1/budgets/create");
};

export const updateBudgetById = (req: Request, res: Response) => {
  console.log("desde PUT /api/v1/budgets/:id");
};

export const deleteBudgetById = (req: Request, res: Response) => {
  console.log("desde DELETE /api/v1/budgets/:id");
};
