import { useAuthStore } from "../store/AuthStore";

const AdminSideBar = () => {
  const { tab, setTab } = useAuthStore();
  const changeTab = (data: string) => {
    setTab(data);
  };
  return (
    <div>
      {/* Sidebar */}
      <aside className="h-202 w-68 bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <button
            className={`block w-full text-left px-3 py-2 rounded ${
              tab == "product" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => changeTab("product")}
          >
            Product Management
          </button>
          <button
            className={`block w-full text-left px-3 py-2 rounded ${
              tab == "order" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => changeTab("order")}
          >
            Order Management
          </button>
          <button
            className={`block w-full text-left px-3 py-2 rounded ${
              tab == "customer" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => changeTab("customer")}
          >
            Customer Management
          </button>
        </nav>
      </aside>
    </div>
  );
};

export default AdminSideBar;
