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
