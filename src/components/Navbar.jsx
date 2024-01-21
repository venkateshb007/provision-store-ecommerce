import { Link, useLocation } from "react-router-dom";
import logo from "../assets/pro.png";

export const Navbar = () => {
  const location = useLocation();
  const isProductsPage = location.pathname === "/products";

  return (
    <div className=" bg-slate-200 flex justify-between items-center leading-10 p-5">
      <img src={logo} alt="Logo" className="h-12 w-20" />
      <Link to={isProductsPage ? "/about" : "/products"}>
        <button className="w-28 h-12 bg-stone-800 text-white rounded-md hover:bg-stone-950 focus:outline-none focus:bg-stone-600">
          {isProductsPage ? "About" : "Products"}
        </button>
      </Link>
    </div>
  );
};
