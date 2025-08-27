import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export const TableGrid = () => {
  const { user } = useAuth();
  const [mesas, setMesas] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      ocupada: false,
      mozo: null,
    }))
  );

  const toggleMesa = (id) => {
    setMesas(
      mesas.map((mesa) =>
        mesa.id === id
          ? {
              ...mesa,
              ocupada: !mesa.ocupada,
              mozo: !mesa.ocupada ? user.username : null,
            }
          : mesa
      )
    );
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
    </div>
  );
}