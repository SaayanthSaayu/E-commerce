import React from 'react';
import { Link } from 'react-router-dom';
import "./ClientPanel.css"
import ClientProductList from "../Clientpage/ClientProductList";
import ClientAddProduct from '../Clientpage/ClientAddProduct';

const ClientPanel = () => {
  return (
    <div>
      <div className="client-panel">
        <div className="client-panel__item">
          <Link to="/client/addproduct" className="client-panel__link">
            Add Product
          </Link>
          <Link to="/client/product" className="client-panel__link">
            My Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ClientPanel
