import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/clientes", clientRoutes);

// Conexion a moongose

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conected"))
  .catch((err) => console.error("Error Mongo:", err));

// Rutas de prueba

app.use("/api/auth", authRoutes);

app.get("/", (req, resp) => {
  resp.send("server is working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto", process.env.PORT);
});
