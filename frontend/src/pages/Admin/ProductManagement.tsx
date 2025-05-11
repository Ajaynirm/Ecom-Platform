const ProductManagement: React.FC = () => {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
        <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded">Add Product</button>
        <div className="flex gap-2 mb-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    {[
                      "S.No",
                      "ID",
                      "Product Name",
                      "Description",
                      "Stock",
                      "Price",
                      "Update",
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
      </div>
    );
  };

  export default ProductManagement;