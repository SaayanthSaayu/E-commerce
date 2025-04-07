// ProductList.jsx (Home Page)
import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../api";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-list-container">
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <Link to={`/products/${product._id}`}>
              <p>{product.productname}</p>
              <p>$ {product.price}</p>
              <img
                src={`http://localhost:1212/uploads/${product.image}`}
                alt={product.productname}
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
