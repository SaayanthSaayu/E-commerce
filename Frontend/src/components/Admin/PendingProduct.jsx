// PendingProducts.jsx
import React, { useState, useEffect } from "react";
import { getPendingproduct, approveProduct, rejectProduct } from "../../api";
import "./PendingProduct.css";
import { useNavigate } from "react-router-dom";

const PendingProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();


   const goBack = () => {
     navigate(-1);
   };

  useEffect(() => {
    getPendingproduct()
      .then((res) => setProducts(res.products))
      .catch((err) => console.error(err));
  }, []);

  const handleApprove = (id) => {
    approveProduct(id)
      .then(() => setProducts(products.filter((product) => product._id !== id)))
      .catch((err) => console.error(err));
  };

  const handleReject = (id) => {
    rejectProduct(id)
      .then(() => setProducts(products.filter((product) => product._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="pending-products-container">
      <h2>Pending Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <img
              src={`http://localhost:1212/uploads/${product.image}`}
              alt={product.productname}
              style={{ maxWidth: "100%", maxHeight: "150px" }}
            />
            <p>
              {product.productname} - {product.clientId.email}
            </p>
            <div>
              <button onClick={() => handleApprove(product._id)}>
                Approve
              </button>
              <button onClick={() => handleReject(product._id)}>Reject</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default PendingProducts;
