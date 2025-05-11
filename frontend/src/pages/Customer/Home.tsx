import React, { useEffect, useState ,useRef} from "react";
import { axiosInstance } from "../../lib/axios";

import {
  Search,
} from "lucide-react";

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
  const [page, setPage]=useState(1);
  const [limit,setLimit]=useState(10);
  const [totalPages,setTotalPages]=useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchWord,setSearchWord]=useState(" ");
  // const searchInputRef = useRef<HTMLInputElement>(null);
  const [image,setImage]=useState(`https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`)

  useEffect(()=>{
    
    const searchProduct= async (): Promise<void> =>{
      try{
        const response=await axiosInstance.get("/products/search",{
          params: { page, limit, searchWord }
        });
        console.log(response.data)
      }catch(e){
        console.error('Error in fetching searched products:', e);
      }
    }
    searchProduct()
  },[searchWord])
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
    <div className="flex flex-col m-2 justify-center items-center">
       
          <div className="flex  justify-center items-center border rounded-full px-3 py-1 max-w-lg bg-gray-100 focus-within:ring-2 ring-blue-400 w-full">
            <Search className="w-5 h-5 text-gray-500" />
            <input
            // ref={searchInputRef}
              type="text"
              placeholder="Search..."
              value={searchWord}
              onChange={(e)=>{setSearchWord(e.target.value); console.log("hi")}}
              className="flex-1 bg-transparent px-2 py-1 outline-none"
            />
          </div>
        
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
