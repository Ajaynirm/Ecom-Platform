import { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

const CustomerManagement: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrCustomer } = useAuthStore();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  // const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const getAllCustomer = async (): Promise<void> => {
      try {
        const response = await axiosInstance.get("/admin/getCustomer", {
          params: { page, limit:10 },
        });
        // const data = await response.json();
        console.log(response.data);
        setCustomers(response.data.customers);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getAllCustomer();
  }, [page]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Customer List</h2>
      <div className="flex gap-2 mb-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "S.No",
                "ID",
                "First Name",
                "Last Name",
                "Email",
                "Created at",
                "View Orders",
                "Delete",
              ].map((title, idx) => (
                <>
                  <th
                    key={idx}
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
                  >
                    {title}
                  </th>
                </>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {customers.map((customer: any, ind: number) => (
              <tr key={ind} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 text-sm text-center">{ind + 1}</td>
                <td className="px-4 py-2 text-sm text-center">{customer.id}</td>
                <td className="px-4 py-2 text-sm text-center">
                  {customer.first_name}
                </td>
                <td className="px-2 py-4 text-sm text-center">
                  {customer.last_name}
                </td>
                <td className="px-4 py-2 text-sm text-center">
                  {customer.email}
                </td>
                <td className="px-4 py-2 text-sm text-center">
                  {customer.created_at}
                </td>
                <td
                  onClick={() => {
                    navigate("/update-product");
                  }}
                >
                  <button className="bg-blue-600 text-amber-50 p-2 rounded-xl">
                    view order
                  </button>
                </td>
                <td
                  onClick={() => {
                    setCurrCustomer(customers[ind]);
                    navigate("/delete-customer");
                  }}
                >
                  <button className="bg-red-600 text-amber-50 p-2 rounded-xl">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center space-x-2">
        <button
          onClick={() => {
            setPage((p) => Math.max(p - 1, 1));
            setCurrentPage((p) => Math.max(p - 1, 1));
          }}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => {
                setPage(pageNum);
                setCurrentPage(pageNum);
              }}
              className={`px-3 py-1 rounded ${
                pageNum === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => {
            setPage((p) => Math.min(p + 1, totalPages));
            setCurrentPage((p) => Math.min(p + 1, totalPages));
          }}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerManagement;
