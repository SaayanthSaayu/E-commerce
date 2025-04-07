// ClientAddProduct.jsx
import React, { useState } from "react";
import { addClientProduct } from "../../api";
import "./ClientAddProduct.css";

const ClientAddProduct = () => {
  const [formData, setFormData] = useState({
    productname: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("productname", formData.productname);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await addClientProduct(data);
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
    <div className="client-add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="productname"
          placeholder="Product Name"
          value={formData.productname}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ClientAddProduct;
