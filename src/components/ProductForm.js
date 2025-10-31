import React, { useState, useEffect } from "react";
import { addProduct, getProduct, updateProduct, deleteProduct, getAllProducts } from "../services/productService";
import '../ProductForm.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import "../ProductList.css";


const ProductForm = () => {
    const [barCode, setBarCode] = useState("");
    const [productName, setProductName] = useState("");
    const [foundProduct, setFoundProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    const handleAdd = async () => {
        await addProduct({ barCode, productName });
        alert("Product added!");

        try {
            const res = await getAllProducts();
            setProducts(res.data);
            setCount(res.data.length);
        } catch (error) {
            console.error("Error fetching products after add:", error);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getAllProducts();
                setProducts(res.data);
                setCount(res.data.length);

            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);


    useEffect(() => {
    }, [count]);

    const handleSearch = async () => {
        const res = await getProduct(barCode);
        if (res.data) {
            setFoundProduct(res.data);
            setProductName(res.data.productName);
        } else {
            alert("Product not found!");
        }
    };

    const handleUpdate = async () => {
        await updateProduct(barCode, { barCode, productName });
        alert("Product updated!");

        const res = await getAllProducts();
        setProducts(res.data);
    };


    const handleDelete = async (barcode) => {
        try {
            await deleteProduct(barcode);
            alert("Product deleted!");

            const res = await getAllProducts();
            setProducts(res.data);
            setCount(res.data.length);
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product.");
        }
    };

    const handleView = () => {
        navigate("/productList");
    };

    return (
        <div className="container">
            <h2>Product Management</h2>

            <label>Bar Code</label>
            <input
                type="text"
                value={barCode}
                onChange={(e) => setBarCode(e.target.value)}
                placeholder="Enter barcode"
            />

            <label>Product Name</label>
            <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
            />

            <div>
                <button className="add-btn" onClick={handleAdd}>Add</button>
                <button className="search-btn" onClick={handleSearch}>Search</button>
                <button className="update-btn" onClick={handleUpdate}>Update</button>

                <button className="view-btn" onClick={handleView}>View Products</button>
            </div>

            {foundProduct && (
                <div className="found-product">
                    <h3>Found Product:</h3>
                    <p><strong>Barcode:</strong> {foundProduct.barCode}</p>
                    <p><strong>Name:</strong> {foundProduct.productName}</p>
                </div>
            )}

            <div >
                <h3>Total Products: {count}</h3>
            </div>

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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.barCode}>
                                    <td>{product.barCode}</td>
                                    <td>{product.productName}</td>
                                    <button className="delete-btn" onClick={() => handleDelete(product.barCode)}>Delete</button>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ProductForm;
