import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { TableModal } from "./TableComponents/TableModal";

export const TableGrid = () => {
  const { user } = useAuth();
  const [mesas, setMesas] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      ocupada: false,
      mozo: null,
    }))
  );

  const [selectedTable, setSelectedTable] = useState(null);

  const toggleMesa = (id) => {
  setMesas((prevMesas) => {
    const updatedMesas = prevMesas.map((m) =>
      m.id === id
        ? {
            ...m,
            ocupada: !m.ocupada,
            mozo: !m.ocupada ? user.username : null,
          }
        : m
    );

    const selected = updatedMesas.find((m) => m.id === id);
    setSelectedTable(selected);
    return updatedMesas;
  });
};

  return (
    <div className="grid grid-cols-3 gap-4">
      {mesas.map((mesa) => (
        <div
          key={mesa.id}
          onClick={() => toggleMesa(mesa.id)}
          className={`p-6 rounded-xl shadow-md text-center font-bold cursor-pointer ${
            mesa.ocupada ? "bg-red-300" : "bg-green-300"
          }`}
        >
          Mesa {mesa.id}
          <div className="text-sm mt-1">
            {mesa.mozo && `Atendida por ${mesa.mozo}`}
          </div>
        </div>
      ))}

      {selectedTable && (
        <TableModal mesa={selectedTable}
        onClose={()=> setSelectedTable(null)}
        />
      )}
    </div>
  );
}