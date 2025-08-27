import {TableGrid} from "../components/TableGrid";

export const WaiterDashboard=()=>{
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mesas</h2>
      <TableGrid />
    </div>
  );
}