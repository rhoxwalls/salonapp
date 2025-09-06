import axios from "axios";
import { useEffect, useState } from "react";

export const ProductsAdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // Axios instance
  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Obtain Products

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/products", formData);
      setMessage("✔ Producto creado");
      setFormData({ name: "", price: "", stock: "" });
      fetchProducts();
    } catch (error) {
      setMessage("❌ " + (error.response?.data?.message || "Error al crear"));
    }
  };

  //   Refresh product
  const handleUpdate = async (id, updateData) => {
    try {
      await api.put(`/products/${id}`, updateData);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    if (!confirm("¿Serguro quiere eliminar este producto?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Productos</h2>

      {/* Formulario de creación */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 flex flex-wrap gap-2 items-center"
      >
        <input
          type="text"
          placeholder="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 rounded w-full md:w-auto"
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="border p-2 rounded w-full md:w-auto"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          className="border p-2 rounded w-full md:w-auto"
          required
        />
        <button className="bg-green-600 text-white px-4 rounded">Crear</button>
      </form>

      {message && <p className="mb-4">{message}</p>}

      {/* Lista de productos */}
      <div className="grid gap-4 md:table w-full">
        <div className="hidden md:table-header-group">
          <div className="table-row bg-gray-200">
            <div className="table-cell p-2 border">Nombre</div>
            <div className="table-cell p-2 border">Precio</div>
            <div className="table-cell p-2 border">Stock</div>
            <div className="table-cell p-2 border">Acciones</div>
          </div>
        </div>

        {products.map((p) => (
          <div
            key={p._id}
            className="p-4 border rounded-lg shadow-sm md:table-row"
          >
            <div className="md:table-cell p-2 font-semibold">{p.name}</div>
            <div className="md:table-cell p-2">${p.price}</div>
            <div className="md:table-cell p-2">{p.stock}</div>
            <div className="flex gap-2 md:table-cell p-2">
              <button
                onClick={() => {
                  handleUpdate(p._id, {
                    ...p,
                    name: prompt("Nuevo stock:", p.name),
                    price: prompt("Nuevo stock:", p.price),
                    stock: prompt("Nuevo stock:", p.stock),
                  });
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded w-[45%]"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-600 w-[45%]  text-white px-3 py-1 rounded"
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
