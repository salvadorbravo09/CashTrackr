import { Router } from "express";
import { createAccount } from "../controllers/auth.controller";

const router = Router();

router.post("/create-account", createAccount);

export default router;
