import express from "express";
import colors from "colors";
import morgan from "morgan";

const app = express();

// Middleware para mostrar logs en consola
app.use(morgan("dev"));

// Middleware para usar JSON en el body de las peticiones
app.use(express.json());

export default app;
