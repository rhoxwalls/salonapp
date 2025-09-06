import express from "express";
import { verifyToken, isAdmin, isMozo } from "../middleware/authMiddleware.js";
import Product from "../models/Product.js";

const router = express.Router();

// 📌 Crear producto (solo admin)
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    const newProduct = new Product({
      name,
      price,
      stock,
      createdBy: req.user.id,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creando producto", error: error.message });
  }
});

// 📌 Listar todos los productos (admin y mozo)
router.get("/", verifyToken, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error obteniendo productos", error: error.message });
  }
});

// 📌 Editar producto (solo admin)
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, stock },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error actualizando producto", error: error.message });
  }
});

// 📌 Vender producto (solo mozo, decrementa stock)
router.patch("/sell/:id", verifyToken, isMozo, async (req, res) => {
  try {
    const { quantity } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    if (product.stock < quantity)
      return res.status(400).json({ message: "Stock insuficiente" });

    product.stock -= quantity;
    await product.save();

    res.json({ message: "Venta registrada", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en la venta", error: error.message });
  }
});

// Delete product
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "no se pudo eliminar:", error });
  }
});
export default router;
