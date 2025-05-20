import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

/**
 * Middleware para manejar la validación de datos de entrada
 * 
 * Este middleware verifica si hay errores de validación en la solicitud
 * utilizando express-validator. Si se encuentran errores, devuelve una
 * respuesta con estado 400 y los errores encontrados. Si no hay errores,
 * permite que la solicitud continúe al siguiente middleware.
 */
export const handleInputValidation = (req: Request, res: Response, next: NextFunction): void => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
}