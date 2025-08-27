import e from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const  app = express();
app.use(cors());
app.use(express.json());

// Conexion a moongose

mongoose.connect(process.env.MONGO_URI, {
    userNewUrlParser:true,
    userUnifiedTopology: true, 
})
.then(()=> console.log("MongoDB conected"))
.catch(err => console.error("Error Mongo:",err));

// Rutas de prueba

app.get("/", (req,resp) => {
    resp.send("server is working");
});

const  PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Servidor escuchando en el puerto", process.env.PORT)
});