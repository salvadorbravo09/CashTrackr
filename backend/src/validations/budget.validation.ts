import { body } from "express-validator";

export const createBudgetValidation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre del presupuesto no puede ir vacio"),
  body("amount")
    .notEmpty()
    .withMessage("La cantidad del presupuesto no puede ir vacio")
    .isNumeric()
    .withMessage("La cantidad debe ser un numero")
    .custom((value) => value > 0)
    .withMessage("La cantidad debe ser mayor a 0"),
];
