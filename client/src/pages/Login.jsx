import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDeadult();
    const result = login(username, password);
    if (result.success) {
      if (result.role === "admin") navigate("/admin");
      else navigate("/mozo");
    } else {
      alert("Cuenta ó contraseña incorrecta");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center"
      >
        <h1 className="text-xl font-bold mb-4">Ingreso</h1>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-3"/>

        <input
        type="password"
        placeholder="contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        />

        <button 
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-900"
        >
          ENTRAR
        </button>
      </form>
    </div>
  );
};
