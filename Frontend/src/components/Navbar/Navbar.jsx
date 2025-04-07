import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cart_icon from "../Assets/cart_icon.png";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("Home");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        {/* Add your Logo here or text*/}
        SHOPPER
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("Home");
          }}
        >
          <Link to="/">Home</Link>
          {menu === "Home" ? <hr /> : null}
        </li>
        <li
          onClick={() => {
            setMenu("Men");
          }}
        >
          <Link to="/category/men">Men</Link>
          {menu === "Men" ? <hr /> : null}
        </li>
        <li
          onClick={() => {
            setMenu("Women");
          }}
        >
          <Link to="/category/women">Women</Link>
          {menu === "Women" ? <hr /> : null}
        </li>
        <li
          onClick={() => {
            setMenu("Kid");
          }}
        >
          <Link to="/category/kid">Kid</Link>
          {menu === "Kid" ? <hr /> : null}
        </li>
      </ul>

      <div className="nav-login">
        {username ? (
          <div>
            <span>{username}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="Cart" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
