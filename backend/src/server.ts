import express from "express";
import colors from "colors";
import morgan from "morgan";
import { database } from "./config/database";

async function connectDB() {
  try {
    await database.authenticate();
    database.sync();
    console.log(colors.bgYellow("Database connected"));
  } catch (error) {
    console.log(error);
    console.log(colors.bgRed("Error connecting to database"));
  }
}

const app = express();

// Middleware para mostrar logs en consola
app.use(morgan("dev"));

// Middleware para usar JSON en el body de las peticiones
app.use(express.json());

// Conectar a la base de datos
connectDB();

export default app;
