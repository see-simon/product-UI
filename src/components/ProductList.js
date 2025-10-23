import react, { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";

const ProductList = () => {
    
    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {
            const res = await getAllProducts();
            setProducts(res.data);
        }
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.barCode}>

                        <table>
                            <tr>
                                <th>Bar Code</th>
                                <th>Product Name</th>
                            </tr>
                            <tr>
                                <td>{product.barCode}</td>
                                <td>{product.productName}</td>
                            </tr>
                        </table>
                    </li>
                ))}
            </ul>
        </div>
    );


}
export default ProductList;