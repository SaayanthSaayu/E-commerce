import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import UserRegister from "./components/Register/UserRegister";
import ClientRegister from "./components/Register/ClientRegister";

import HomePage from "./components/pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import AdminPanel from "./components/pages/AdminPanel";
import ClientPanel from "./components/pages/ClientPanel";
import ProductDetails from "./components/Products/ProductDetails";
import Cart from "./components/Cart/Cart";
import CategoryPage from "./components/CategoryPage/CatrgoryPage";
import UserOrders from "./components/Orders/UserOrder";

import ClientList from "./components/Admin/ClientList";
import PendingProducts from "./components/Admin/PendingProduct";
import UserList from "./components/Admin/UserList";
import AdminOrder from "./components/Admin/AdminOrder";
import AppProduct from "./components/Admin/AppProduct";
import Footer from "./components/Footer/Footer";

import ClientAddProduct from "./components/Clientpage/ClientAddProduct";
import ClientProductList from "./components/Clientpage/ClientProductList";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/client-register" element={<ClientRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/client-panel" element={<ClientPanel />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/orders" element={<UserOrders />} />

          <Route path="/admin/orders" element={<AdminOrder />} />
          <Route path="/admin/userlist" element={<UserList />} />
          <Route path="/admin/pending" element={<PendingProducts />} />
          <Route path="/admin/clientlist" element={<ClientList />} />
          <Route path="/admin/addproduct" element={<AppProduct />} />

          <Route path="/client/addproduct" element={<ClientAddProduct/>} />
          <Route path="/client/product" element={<ClientProductList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
