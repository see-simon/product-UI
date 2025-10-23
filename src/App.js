import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductForm />} />
        <Route path="/productList" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}
