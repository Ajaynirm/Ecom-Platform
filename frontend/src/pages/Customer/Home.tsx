import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useAuthStore } from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";

import { Search } from "lucide-react";

type Product = {
  id: number;
  name: string;
  image: string;
  description: number;
  price: number;
  stock: number;
};

const HomePage: React.FC = () => {
  const { setCurrProduct } = useAuthStore();
  const navigate = useNavigate();
  const [resData, setResData] = useState(Object);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchWord, setSearchWord] = useState("");
  const [searchInput,setSearchInput]=useState("");

  // const searchInputRef = useRef<HTMLInputElement>(null);
  const image=
    `https://media.istockphoto.com/id/1249219777/photo/shopping-online-concept-parcel-or-paper-cartons-with-a-shopping-cart-logo-in-a-trolley-on-a.jpg?s=612x612&w=0&k=20&c=EWKEahyVLY8iAHyirCCDESHRGW37lqUJ7In0SssNSLE=`
  ;

  useEffect(() => {
    if(searchWord==="") return;

    const searchProduct = async (): Promise<void> => {
      try {
        console.log("search effect running ")
        const response = await axiosInstance.get("/products/search", {
          params: { page, limit:10, searchWord },
        });
        console.log(response.data);
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setResData(response);
      } catch (e) {
        console.error("Error in fetching searched products:", e);
      }
    };
    searchProduct();
  }, [searchWord]);

  useEffect(() => {
    const getAllProduct = async (): Promise<void> => {
      try {
        console.log("get product effect running ")
        const response = await axiosInstance.get("/products/list-product", {
          params: { page, limit:10 },
        });
        // const data = await response.json();
        console.log(response.data);
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setResData(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getAllProduct();
  }, [page]);

  if (!resData) {
    return (
      <>
        <h2>No data </h2>
      </>
    );
  }

  return (
    <div className="flex flex-col m-2 justify-center items-center">
      <div className="flex  justify-center items-center border rounded-full px-3 py-1 max-w-lg bg-gray-100 focus-within:ring-2 ring-blue-400 w-full">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          // ref={searchInputRef}
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          className="flex-1 bg-transparent px-2 py-1 outline-none"
        />
        <button 
         className={`ml-2 px-3 py-1 rounded transition 
          ${searchInput.trim() === "" 
            ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
            : "bg-blue-500 hover:bg-blue-600 cursor-default text-white"}
        `}
        disabled={searchInput.trim() === ""}
        onClick={()=>{
          setSearchWord(searchInput)
        }}
        >click</button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product, ind: number) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            onClick={() => {
              setCurrProduct(products[ind]);
              navigate("/show-product");
            }}
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

export default HomePage;
