import { Router } from "express";
import { body } from "express-validator";
import { createAccount } from "../controllers/auth.controller";
import { handleInputValidation } from "../middleware/validation";

const router = Router();

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password debe tener al menos 8 caracteres"),
  body("email").isEmail().withMessage("El email debe ser un email valido"),
  handleInputValidation, // Si hay errores de validacion, se llama a este middleware
  createAccount
);

export default router;
