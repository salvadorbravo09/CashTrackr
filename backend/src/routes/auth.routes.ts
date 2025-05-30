import { Router } from "express";
import { body } from "express-validator";
import {
  confirmAccount,
  createAccount,
  login,
} from "../controllers/auth.controller";
import { handleInputValidation } from "../middleware/validation";
import { limiter } from "../config/limiter";

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

router.post(
  "/confirm-account",
  limiter,
  body("token")
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("Token no valido"),
  handleInputValidation,
  confirmAccount
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Email no valido"),
  body("password").notEmpty().withMessage("El password no puede ir vacio"),
  handleInputValidation,
  login
);

export default router;
