
import React, { useState, useEffect } from "react";
import {
  clientProducts,
  getPendingProducts,
  getApprovedProducts,
  getRejectedProducts,
} from "../../api";
import "./ClientProductList.css";

const ClientProductList = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let fetchedProducts = [];
        if (filter === "all") {
          fetchedProducts = await clientProducts();
        } else if (filter === "pending") {
          fetchedProducts = await getPendingProducts();
        } else if (filter === "approved") {
          fetchedProducts = await getApprovedProducts();
        } else if (filter === "rejected") {
          fetchedProducts = await getRejectedProducts();
        }
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [filter]);

  return (
    <div className="client-products-container">
      <h2>My Products</h2>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("approved")}>Approved</button>
        <button onClick={() => setFilter("rejected")}>Rejected</button>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <strong>{product.productname}</strong> - {product.status}
            <img
              src={`http://localhost:1212/uploads/${product.image}`}
              alt={product.productname}
              style={{ maxWidth: "100%", maxHeight: "150px" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientProductList;
