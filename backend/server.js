import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import mozoRoutes from "./routes/mozoRoutes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*", // tu frontend
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/clientes", clientRoutes);
app.use("/api/mozos", mozoRoutes);

app.get("/", (req, res) => {
  res.send("server is working");
});


// Conexion a moongose

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conected"))
  .catch((err) => console.error("Error Mongo:", err));

// Rutas de prueba


app.get("/", (req, resp) => {
  resp.send("server is working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto", PORT);
});
