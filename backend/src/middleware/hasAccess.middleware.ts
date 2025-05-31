import { Request, Response, NextFunction } from "express";

export function hasAccess(req: Request, res: Response, next: NextFunction) {
  if (req.budget.userId !== req.user.id) {
    res.status(403).json({ error: "Accion no permitida" });
    return;
  }
  next();
}
