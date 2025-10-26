import React, { useEffect, useState } from "react";
import "../ProductList.css"; 
import { getAllProducts } from "../services/productService";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">📦 Product List</h2>
      {products.length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Bar Code</th>
              <th>Product Name</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.barCode}>
                <td>{product.barCode}</td>
                <td>{product.productName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
