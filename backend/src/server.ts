import express from "express";
import colors from "colors";
import morgan from "morgan";
import { database } from "./config/database";
import budgetRouter from "./routes/budget.routes";
import authRouter from "./routes/auth.routes";

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

app.use("/api/v1/budgets", budgetRouter);
app.use("/api/v1/auth", authRouter);

export default app;
