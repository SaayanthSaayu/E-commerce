// UsersOrders.jsx
import React, { useEffect, useState } from "react";
import { fetchUsersWithOrders } from "../../api";
import { useNavigate } from "react-router-dom";
import "./UsersOrder.css";

const UsersOrders = () => {

  const navigate = useNavigate();
  const [usersOrders, setUsersOrders] = useState([]);

  const goBack = () => {
    navigate(-1);
  }

  useEffect(() => {
    const getData = async () => {
      const data = await fetchUsersWithOrders();
      setUsersOrders(data);
    };
    getData();
  }, []);

  return (
    <div className="users-orders-container">
      <h2>Users and Their Orders</h2>
      {usersOrders.length > 0 ? (

        <div>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Orders</th>
            </tr>
          </thead>
          <tbody>
            {usersOrders.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.orders.length > 0 ? (
                    <ul>
                      {user.orders.map((order) => (
                        <li key={order._id}>
                          Order ID: {order._id}, Total: ${order.totalprice},
                          Status: {order.status}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No Orders"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

            <button onClick={goBack}>Back</button>
        </div>
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UsersOrders;
