import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // formato: Bearer <token>

  if (!token) {
    return res.status(403).json({ error: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guardamos el id del user
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

export const isAdmin = (req,res, netx) =>{
  if(req.user.role !== "admin"){
    return res.status(403).json({error: "Acceso denegado. Solo Administrador"});
  }
  netx();
};