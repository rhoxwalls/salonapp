import { useState } from "react";

export const AdminDashboard = () => {
  const [mozos, setMozos] = useState([{ username: "mozo1", password: "1234" }]);
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Cerveza", precio: 1500, stock: 50 },
  ]);

  // Agregar Mozo
  const addMozo = () => {
    const nuevo = { username: `mozo${mozos.length + 1}`, password: "1234" };
    setMozos([...mozos, nuevo]);
  };

  // Agregar Producto
  const addProducto = () => {
    const nombre = prompt("Nombre producto:");
    const precio = parseFloat(prompt("Precio:"));
    const stock = parseInt(prompt("Stock:"));
    if (nombre && precio && stock >= 0) {
      setProductos([
        ...productos,
        { id: productos.length + 1, nombre, precio, stock },
      ]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Panel Admin</h1>

      {/* Gestión de Mozos */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl mb-2 font-semibold">Mozos</h2>
        <ul className="mb-2">
          {mozos.map((m, i) => (
            <li key={i} className="border-b py-1">
              {m.username} (pass: {m.password})
            </li>
          ))}
        </ul>
        <button
          onClick={addMozo}
          className="bg-green-500 text-white px-3 py-1 rounded-lg"
        >
          Agregar Mozo
        </button>
      </div>

      {/* Gestión de Productos */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl mb-2 font-semibold">Productos</h2>
        <ul className="mb-2">
          {productos.map((p) => (
            <li key={p.id} className="border-b py-1">
              {p.nombre} - ${p.precio} (stock: {p.stock})
            </li>
          ))}
        </ul>
        <button
          onClick={addProducto}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg"
        >
          Agregar Producto
        </button>
      </div>
    </div>
  );
}