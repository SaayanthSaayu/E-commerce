// AppProduct.jsx
import React, { useState } from "react";
import { addProduct } from "../../api";
import "./AppProduct.css";
import { useNavigate } from "react-router-dom";

const AppProduct = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productname: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: null,
  });


   const goBack = () => {
     navigate(-1);
   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addProduct(formData);
      console.log(response);
      alert("Product added successfully!");
      setFormData({
        productname: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="app-product-container">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={formData.productname}
          onChange={(e) =>
            setFormData({ ...formData, productname: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />
        <button type="submit">Add Product</button>
      </form>

      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default AppProduct;
