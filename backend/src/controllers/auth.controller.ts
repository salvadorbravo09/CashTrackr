import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { sendConfirmationEmail } from "../emails/authEmail";

export const createAccount = async (req: Request, res: Response) => {
  try {
    // Desestructuramos desde el cuerpo de la solicitud
    const { name, email, password } = req.body;

    // Prevenir usuarios duplicados
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      res.status(400).json({ error: "El usuario ya existe con ese email" });
      return;
    }

    // Encriptar la contraseña
    const hashedPassword = await hashPassword(password);

    // Generar token
    const token = generateToken();

    // Crear un nuevo usuario con los datos proporcionados
    const user = new User({
      name,
      email,
      password: hashedPassword,
      token,
    });

    await user.save(); // Guardar el usuario en la base de datos

    // Enviar email de confirmacion
    await sendConfirmationEmail({
      name: user.name,
      email: user.email,
      token: user.token,
    });
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const confirmAccount = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const user = await User.findOne({ where: { token: token } });
    if (!user) {
      res.status(404).json({ error: "Token no valido" });
      return;
    }

    // Marcar el usuario como confirmado
    user.confirmed = true;
    user.token = ""; // Limpiar el token ya utilizado
    await user.save();
    res.status(200).json({ message: "Cuenta confirmada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error al confirmar la cuenta" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    

  } catch (error) {
    res.status(500).json({ error: "Hubo un error al iniciar sesión" });
  }
};
