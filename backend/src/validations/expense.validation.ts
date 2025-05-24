import { body } from "express-validator"

export const createExpenseValidation = [
    body("name")
        .notEmpty()
        .withMessage("El nombre del gasto no puede ir vacío"),
    body("amount")
        .notEmpty()
        .withMessage("La cantidad del gasto no puede ir vacía")
        .isNumeric()
        .withMessage("La cantidad debe ser un número")
        .custom((value) => value > 0)
        .withMessage("La cantidad debe ser mayor a 0"),
]