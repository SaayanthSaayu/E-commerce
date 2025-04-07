// CategoryPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../api";
import { Link } from "react-router-dom";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        const filteredProducts = allProducts.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="category-page-container">
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Products</h2>
      {products.length === 0 ? (
        <p className="no-products">No products found in this category.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id}>
              <li>
                <div className="product-info">
                  <strong>{product.productname}</strong> - ${product.price}
                </div>
                <img
                  src={`http://localhost:1212/uploads/${product.image}`}
                  alt={product.productname}
                  style={{ maxWidth: "100%", maxHeight: "150px" }}
                />
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryPage;
