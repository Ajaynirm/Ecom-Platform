import React, { useEffect } from "react";
import AdminSideBar from "../../components/AdminSideBar";
import { useAuthStore } from "../../store/AuthStore";
import CustomerManagement from "./CustomerManagement";
import ProductManagement from "./ProductManagement";
import OrderManagement from "./OrderManagement";

const AdminHome: React.FC = () => {
  const { tab, setTab } = useAuthStore();
  useEffect(() => {
    setTab("product");
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar />

      <main className="flex-1 p-6">
        {tab == "product" && <ProductManagement />}
        {tab == "order" && <OrderManagement />}
        {tab == "customer" && <CustomerManagement />}
      </main>
    </div>
  );
};

export default AdminHome;
