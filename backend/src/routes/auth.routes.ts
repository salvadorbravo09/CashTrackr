import { Router } from "express";
import { body, param } from "express-validator";
import {
  confirmAccount,
  createAccount,
  forgotPassword,
  getUser,
  login,
  resetPasswordWithToken,
  validateToken,
} from "../controllers/auth.controller";
import { handleInputValidation } from "../middleware/validation";
import { limiter } from "../config/limiter";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(limiter); // Aplicar el limitador a todas las rutas de este router

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

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("Email no valido"),
  handleInputValidation,
  forgotPassword
);

router.post(
  "/validate-token",
  body("token")
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("Token no valido"),
  handleInputValidation,
  validateToken
);

router.post(
  "/reset-password/:token",
  param("token")
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("Token no valido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password debe tener al menos 8 caracteres"),
  handleInputValidation,
  resetPasswordWithToken
);

router.get("/user", authenticate, getUser);

export default router;
