import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import { EditMozo } from "./EditMozos";


export const AdminPanel = () => {
  const [mozos, setMozos] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "mozo", // por defecto mozo
  });
  const [message, setMessage] = useState("");

  // en AdminPanel
const [editingMozo, setEditingMozo] = useState(null);


  const token = localStorage.getItem("token");

  // Axios instance para no repetir headers
  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // obtener mozos
  const fetchMozos = async () => {
    try {
      const res = await api.get("/mozos");
      setMozos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMozos();
  }, []);

  // Crear mozo

  const handleSubmith = async (e) => {
    e.preventDefault();

    try {
      await api.post("/mozos", formData);
      setMessage("✔ mozo creado");
      setFormData({ username: "", email: "", password: "" });
      fetchMozos();
    } catch (err) {
      setMessage(
        "❌ " + (err.response?.data?.message || "Error al crear mozo")
      );
    }
  };
  // Eliminar mozo

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este mozo?")) return;

    try {
      await api.delete(`/mozos/${id}`);
      fetchMozos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-xl font-bold mb-4">Gestión de mozos</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmith} className="mb-6 flex  gap-2 flex-wrap">
        <input
          type="text"
          name="username"
          placeholder="Nombre"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className="border rounden p-2 w-full"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="correo"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border rounden p-2 w-full"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="contraseña"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="border rounded p-2 w-full"
          required
        />
        <button className="bg-blue-600 text-white px-4 rounded">Crear</button>
      </form>

      {/* Tabla */}
      <div className="grid gap-4 md:table w-full">
        {/* encabezado solo en desktop */}
        <div className="hidden md:table-header-group">
          <div className="table-row bg-gray-200">
            <div className="table-cell p-2 border">Nombre</div>
            <div className="table-cell p-2 border">Correo</div>
            <div className="table-cell p-2 border">Contraseña</div>
            <div className="table-cell p-2 border">Acciones</div>
          </div>
        </div>

        {mozos.map((mozo) => (
          <div
            key={mozo._id}
            className="p-4 border rounded-lg shadow-sm md:table-row"
          >
            <div className="mb-2 font-semibold md:table-cell p-1">
              {mozo.username}
            </div>
            <div className="mb-2 md:table-cell truncate p-1">{mozo.email}</div>
            <div className="mb-2 md:table-cell truncate overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] p-1">
              {mozo.password}
            </div>
            <div className="flex gap-2 md:table-cell p-2 ">
              <button
                onClick={()=>setEditingMozo(mozo)}
                className="bg-gray-500 hover:bg-amber-700 text-white font-bold px-4 rounded"
              >
                Editar
              </button>
              {editingMozo && (
                <EditMozo
                  mozo={editingMozo}
                  onClose={() => setEditingMozo(null)}
                  onUpdated={fetchMozos}
                />
              )}
              <button
                onClick={() => handleDelete(mozo._id)}
                className="bg-red-600 font-bold text-white px-4 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
