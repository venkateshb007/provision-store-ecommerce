import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";

export const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        const response = await axios.get(
          "https://api.kalpav.com/api/v1/product/category/retail",
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        setAllProducts(response.data.response);
        setDisplayedProducts(response.data.response);
      } catch (error) {
        console.log("Error in fetching Data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredProducts = allProducts.filter((product) =>
      product.productCategory.productCategoryName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    setDisplayedProducts(filteredProducts);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-300 p-8">
        <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-md mb-4">
          <div className="flex items-center mb-4">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-stone-800"
              value={searchTerm}
              onChange={handleSearchTermChange}
              onKeyPress={handleKeyPress}
              placeholder="Search product by name"
            />
            <button
              className="ml-2 bg-stone-800 text-white px-4 py-2 rounded-md hover:bg-stone-950 focus:outline-none focus:bg-stone-600"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedProducts.map((product) => (
            <div
              key={product.productCategory.productCategoryId}
              className="bg-white shadow-md p-4 rounded-md"
            >
              <img
                src={product.productCategory.productCategoryImage}
                alt=""
                className="w-1/2 p-5 object-cover mb-2 rounded-md"
              />
              <p className="text-sm font-semibold">
                {product.productCategory.productCategoryName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
