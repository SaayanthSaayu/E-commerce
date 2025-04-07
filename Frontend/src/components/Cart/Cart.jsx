// Cart.jsx
import React, { useState, useEffect } from "react";
import { getProductById, placeOrder } from "../../api";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!userId) return;

      const cartKey = `cart_${userId}`;
      const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

      const updatedCartPromises = cart.map(async (item) => {
        try {
          const productDetails = await getProductById(item._id);
          const currentStock = productDetails.product.stock;

          if (item.quantity > currentStock) {
            item.quantity = currentStock;
          }
          return item;
        } catch (error) {
          console.error("Error fetching product details:", error);
          return { ...item, error: "Product details not available" };
        }
      });

      const updatedCart = await Promise.all(updatedCartPromises);

      setCartItems(updatedCart);
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    };

    fetchCartItems();
  }, [userId]);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePlaceOrder = async () => {
    if (!userId) {
      alert("Please log in to place an order.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const orderItems = cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
      }));

      const orderData = {
        products: orderItems,
        totalprice: calculateTotal(),
        
      };

      await placeOrder(orderData);
      alert("Order placed successfully!");
      localStorage.removeItem(`cart_${userId}`);
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  if (!userId) {
    return <p className="login-prompt">Please log in to view your cart.</p>;
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                <img
                  src={`http://localhost:1212/uploads/${item.image}`}
                  alt={item.productname}
                  style={{ maxWidth: "100%", maxHeight: "150px" }}
                />
                <div>
                  {item.productname} - Quantity: {item.quantity} - Price: $
                  {item.price * item.quantity}
                  {item.error && <p className="error-message">{item.error}</p>}
                </div>
                <button onClick={() => handleRemoveFromCart(item._id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p>Total: ${calculateTotal()}</p>
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
