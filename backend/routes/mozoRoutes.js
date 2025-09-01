import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 Crear mozo
router.post("/", verifyToken, isAdmin, async (req, res) => {

  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMozo = new User({
      username,
      email,
      password: hashedPassword,
      role: "mozo",
    });

    await newMozo.save();
    res.json(newMozo);
  } catch (err) {
    res.status(500).json({ error: "Error al crear mozo" });
  }
});

// 📌 Listar mozos
router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const mozos = await User.find({ role: "mozo" });
    res.json(mozos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener mozos" });
  }
});

// 📌 Editar mozo
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { username, email } = req.body;
    const mozo = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true }
    );
    res.json(mozo);
  } catch (err) {
    res.status(500).json({ error: "Error al editar mozo" });
  }
});

// 📌 Eliminar mozo
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Mozo eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar mozo" });
  }
});

export default router;