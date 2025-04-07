import React, { useState, useEffect } from "react";
import { getProductById } from "../../api";
import { useParams } from "react-router-dom";
import DescriptionBox from "../DescriptionBox/DescriptionBox";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDetails = await getProductById(productId);
        setProduct(productDetails.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const productDetails = await getProductById(productId);
      const currentStock = productDetails.product.stock;

      const cartKey = `cart_${userId}`;
      const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
      const productToAdd = { ...product, quantity: 1 };
      const existingProduct = cart.find(
        (item) => item._id === productToAdd._id
      );

      if (existingProduct) {
        if (existingProduct.quantity + 1 <= currentStock) {
          existingProduct.quantity += 1;
        } else {
          alert("Maximum stock reached for this product.");
          return;
        }
      } else {
        if (1 <= currentStock) {
          cart.push(productToAdd);
        } else {
          alert("Product is out of stock.");
          return;
        }
      }

      localStorage.setItem(cartKey, JSON.stringify(cart));
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (!product) {
    return <div className="product-details-container">Loading...</div>;
  }

  return (
    <>
      <div className="product-details-container">
        <div className="product-image">
          <img
            src={`http://localhost:1212/uploads/${product.image}`}
            alt={product.productname}
          />
        </div>
        <div className="product-info">
          <h2>{product.productname} Details</h2>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className="description-box-container">
        <DescriptionBox />
      </div>
    </>
  );
};

export default ProductDetails;
