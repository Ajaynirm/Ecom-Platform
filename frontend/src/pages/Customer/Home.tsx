import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";

type Product = {
  id: number;
  name: string;
  image: string;
  description: number;
  price: number;
  stock:number;
};
interface ResData {
  success: boolean
  limit: number
  totalProducts: number
  totalPages: number
  products: []
}

const HomePage: React.FC = () => {
  const [resData, setResData]=useState(Object);
  const [products,setProducts]=useState([]);
  const [page, setPage]=useState(2);
  const [limit,setLimit]=useState(10);
  const [totalPages,setTotalPages]=useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [image,setImage]=useState(`https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`)


  useEffect(() => {
     const getAllProduct= async (): Promise<void> =>{
      try {
        const response = await axiosInstance.get('/products/list-product',{
          params: {page,limit}
        });
        // const data = await response.json();
        console.log(response.data);
        setProducts(response.data.products)
        setTotalPages(response.data.totalPages)
        setResData(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    getAllProduct()
  }, [page]);

  if(!resData){
    return <>
       <h2>No data </h2>
    </>
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={image}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="mt-2 font-semibold">{product.name}</h2>
            <p className="text-blue-600 font-bold">${product.price}</p>
          </div>
        ))}
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

export default HomePage;
