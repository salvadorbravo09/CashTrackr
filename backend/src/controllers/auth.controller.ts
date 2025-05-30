import { Request, Response } from "express";
import User from "../models/User";
import { comparePassword, hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import {
  sendConfirmationEmail,
  sendPasswordResetToken,
} from "../emails/authEmail";
import { generateJWT } from "../utils/jwt";

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
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    if (!user.confirmed) {
      res.status(403).json({ error: "Cuenta no confirmada" });
      return;
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json({ error: "Contraseña incorrecta" });
      return;
    }

    // Generar un token JWT
    const token = generateJWT(user.id);
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al iniciar sesión" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.status(404).json({ error: "Usuario no encontrado" });
    return;
  }

  user.token = generateToken(); // Generar un nuevo token
  await user.save();

  await sendPasswordResetToken({
    name: user.name,
    email: user.email,
    token: user.token,
  });

  res.status(200).json({ message: "Token enviado al correo electrónico" });
};

export const validateToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  const tokenExists = await User.findOne({ where: { token } });
  if (!tokenExists) {
    res.status(404).json({ error: "Token no valido" });
    return;
  }

  res.status(200).json({ message: "Token valido" });
};

export const resetPasswordWithToken = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ where: { token } });
  if (!user) {
    res.status(404).json({ error: "Token no valido" });
    return;
  }

  // Asignar el nuevo password
  user.password = await hashPassword(password);
  user.token = "";
  await user.save();

  res.status(200).json({ message: "Contraseña reestablecida correctamente" });
};

export const getUser = async (req: Request, res: Response) => {
  res.json(req.user);
};

export const updateCurrentUserPassword = async (
  req: Request,
  res: Response
) => {
  const { current_password, password } = req.body;
  const { id } = req.user;

  const user = await User.findByPk(id);

  const isPasswordCorrect = await comparePassword(
    current_password,
    user.password
  );

  if (!isPasswordCorrect) {
    res.status(401).json({ error: "Contraseña actual incorrecta" });
    return;
  }

  user.password = await hashPassword(password);
  await user.save();
  res.status(200).json({ message: "Contraseña actualizada correctamente" });
  res.json(user);
};

export const checkPassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { id } = req.user;

  const user = await User.findByPk(id);

  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    res.status(401).json({ error: "Contraseña incorrecta" });
    return;
  }

  res.json({ message: "Contraseña correcta" });
};
