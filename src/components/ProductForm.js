import React, { useState } from "react";
import { addProduct, getProduct, updateProduct, deleteProduct } from "../services/productService";
import '../ProductForm.css';
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
    const [barCode, setBarCode] = useState("");
    const [productName, setProductName] = useState("");
    const [foundProduct, setFoundProduct] = useState(null);

    const navigate = useNavigate();

    const handleAdd = async () => {
        await addProduct({ barCode, productName });
        alert("Product added!");
    };

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
    };

    const handleDelete = async () => {
        await deleteProduct(barCode);
        alert("Product deleted!");
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
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
                <button onClick={handleView}>View Products</button>
            </div>

            {foundProduct && (
                <div className="found-product">
                    <h3>Found Product:</h3>
                    <p><strong>Barcode:</strong> {foundProduct.barCode}</p>
                    <p><strong>Name:</strong> {foundProduct.productName}</p>
                </div>
            )}
        </div>
    );
};

export default ProductForm;
