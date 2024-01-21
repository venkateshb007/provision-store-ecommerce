import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Products } from "./pages/Products";
import { About } from "./pages/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
