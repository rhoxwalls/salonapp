import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ruta protegida - solo logueados pueden entrar
router.get("/", verifyToken, (req, res) => {
  res.json({
    message: "Lista de clientes solo visible para usuarios logueados",
    userId: req.user.id
  });
});

export default router;