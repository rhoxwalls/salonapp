import bcrypt from "bcryptjs";

const hash = "$2a$10$pL67IwAYYJ/990me0iEqvuUktbYSeJcrDEDbWbSE881GcgHL3OqTW"; // el hash que está en Mongo
const password = "123456";

const match = await bcrypt.compare(password, hash);
console.log("¿Coincide?", match);