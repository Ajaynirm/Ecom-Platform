import { useState,useEffect } from "react";
import { axiosInstance } from "../../lib/axios";

const CustomerManagement: React.FC = () => {
  const [resData, setResData]=useState(Object);
  const [customers,setCustomers]=useState([]);
  const [page, setPage]=useState(1);
  const [limit,setLimit]=useState(10);
  const [totalPages,setTotalPages]=useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchWord,setSearchWord]=useState(" ");

  useEffect(() => {
    const getAllCustomer= async (): Promise<void> =>{
     try {
       const response = await axiosInstance.get('/admin/getCustomer',{
         params: {page,limit}
       });
       // const data = await response.json();
       console.log(response.data);
       setCustomers(response.data.customers)
       setTotalPages(response.data.totalPages)
       setResData(response);
     } catch (error) {
       console.error('Error fetching products:', error);
     }
   }
   getAllCustomer()
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
                      "Created at",
                      "Total Orders",
                      "View Orders",
                      "Delete"
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
                <tr className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 text-sm text-center">
                  hi
                  </td>
                  <td className="px-4 py-2 text-sm text-center">
                  hi
                  </td>
                  </tr>
                </tbody>
                
              </table>
            </div>
            
      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center space-x-2">
        <button
          onClick={() => {
            setPage((p) => Math.max(p - 1, 1))
            setCurrentPage((p)=> Math.max(p-1,1))}}
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
              onClick={() => {setPage(pageNum)
                setCurrentPage(pageNum)
              }
                
              }
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
            setPage((p) => Math.min(p + 1, totalPages))
            setCurrentPage((p)=> Math.min(p+1,totalPages))
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
  