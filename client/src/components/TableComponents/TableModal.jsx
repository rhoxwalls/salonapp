import { useState } from "react";

export const TableModal = ({ mesa, onClose }) => {
  const [pedido, setPedido] = useState({ producto: "", cantidad: 1 });
  const [pedidos, setPedidos] = useState(mesa.pedidos || []);
  const [total, setTotal] = useState(mesa.total || 0);

  const agregarPedido = () => {
    if (!pedido.producto) return;
    const subtotal = 1000 * pedido.cantidad; // ⚠️ simulado, después vendrá de la API de productos
    const nuevo = {
      ...pedido,
      subtotal,
    };
    setPedidos([...pedidos, nuevo]);
    setTotal(total + subtotal);
    setPedido({ producto: "", cantidad: 1 });
  };

  const cerrarMesa = () => {
    alert(`Mesa cerrada. Total: $${total}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Mesa {mesa.id}</h2>
        <p className="mb-2">Mozo: {mesa.mozo}</p>

        <div className="mb-4">
          <h3 className="font-semibold">Pedidos</h3>
          <ul className="text-sm">
            {pedidos.map((p, i) => (
              <li key={i}>
                {p.cantidad}x {p.producto} - ${p.subtotal}
              </li>
            ))}
          </ul>
          <p className="font-bold mt-2">Total: ${total}</p>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Producto"
            value={pedido.producto}
            onChange={(e) =>
              setPedido({ ...pedido, producto: e.target.value })
            }
            className="border p-2 rounded w-2/3"
          />
          <input
            type="number"
            value={pedido.cantidad}
            min="1"
            onChange={(e) =>
              setPedido({ ...pedido, cantidad: parseInt(e.target.value) })
            }
            className="border p-2 rounded w-1/3"
          />
        </div>
        <button
          onClick={agregarPedido}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-2"
        >
          Agregar Pedido
        </button>
        <button
          onClick={cerrarMesa}
          className="bg-green-600 text-white px-4 py-2 rounded w-full mb-2"
        >
          Cerrar Mesa
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded w-full"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
