// ClientList.jsx
import React, { useState, useEffect } from "react";
import { getClientList, getClientProducts } from "../../api";
import { useNavigate } from "react-router-dom";
import "./ClientList.css";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [clientProducts, setClientProducts] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate();

   const goBack = () => {
     navigate(-1);
   };

  useEffect(() => {
    getClientList()
      .then((res) => {
        console.log("Clients from API:", res);
        setClients(res);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleShowProducts = (clientId) => {
    console.log("Fetching products for client:", clientId);
    getClientProducts(clientId)
      .then((products) => {
        console.log("Client products:", products);
        setClientProducts(products);
        setSelectedClient(clients.find((c) => c._id === clientId));
        console.log(
          "selected client:",
          clients.find((c) => c._id === clientId)
        );
      })
      .catch((err) => console.error(err));
  };

  const handleCloseProducts = () => {
    setClientProducts(null);
    setSelectedClient(null);
  };

  return (
    <div className="client-list-container">
      <h2>Client List</h2>
      {clients.length > 0 ? (
        <ul>
          {clients.map((client) => (
            <li key={client._id}>
              {client.username} - {client.email}
              <button onClick={() => handleShowProducts(client._id)}>
                Show Products
              </button>
            </li>
          ))}
          <button onClick={goBack}>Back</button>
        </ul>
      ) : (
        <p className="no-clients">No clients found.</p>
      )}

      {clientProducts && (
        <div>
          <h3>Products by {selectedClient?.username}</h3>
          <button onClick={handleCloseProducts}>Close</button>
          {clientProducts.length > 0 ? (
            <ul className="product-list">
              {clientProducts.map((product) => {
                console.log("Product name:", product.productname);
                return (
                  <li key={product._id}>
                    {product.productname}
                    {product.image && (
                      <img
                        src={`http://localhost:1212/uploads/${product.image}`}
                        alt={product.productname}
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="no-products">No products found for this client.</p>
          )}
        </div>
      )}
      {console.log(clients)}
      {console.log(clientProducts)}
      {console.log(selectedClient)}
    </div>
  );
};

export default ClientList;
