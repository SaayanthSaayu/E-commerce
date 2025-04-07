import React from "react";
import { Link } from "react-router-dom";
import "./Adminpanel.css"

import AdminOrder from "../Admin/AdminOrder";
import AppProduct from "../Admin/AppProduct";
import ClientList from "../Admin/ClientList";
import PendingProduct from "../Admin/PendingProduct";
import UserList from "../Admin/UserList";

const AdminPanel = () => {
  return (
    <div>
      <div className="admin-panel">
        <div className="admin-panel__item">
          <Link to="/admin/orders" className="admin-panel__link">
            Orders
          </Link>
          <Link to="/admin/addproduct" className="admin-panel__link">
            Add Product
          </Link>
         
          <Link to="/admin/clientlist" className="admin-panel__link">
            Client List
          </Link>
          <Link to="/admin/pending" className="admin-panel__link">
            Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
