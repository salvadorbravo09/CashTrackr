import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  console.log("desde /api/v1/budgets");
});

export default router;
