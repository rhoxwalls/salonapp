import { AdminPanel } from "../components/MozosComponents/AdminPanel";
import { ProductsAdminDashboard } from "../components/ProductsComponent.jsx/ProductsAdminDashboard";

export const AdminDashboard = () => {
  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold">Panel Admin</h1>
      <AdminPanel />
      <ProductsAdminDashboard />
    </div>
  );
};
