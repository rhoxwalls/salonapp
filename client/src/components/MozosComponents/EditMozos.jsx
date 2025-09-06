import { useState } from "react";
import axios from "axios";

export const EditMozo = ({ mozo, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    username: mozo.username,
    email: mozo.email,
    password: "", // solo si quiere cambiarla
  });

  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/mozos/${mozo._id}`, formData);
      onUpdated(); // refresca lista
      onClose(); // cierra el modal/form
    } catch (err) {
      console.error(err);
      alert("Error al actualizar mozo");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h3 className="text-lg font-bold mb-4">Editar Mozo</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Nombre"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Correo"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Nueva contraseña (opcional)"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="border p-2 rounded"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
