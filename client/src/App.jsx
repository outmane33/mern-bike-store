import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Product from "./pages/Product";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import AdminHeader from "./components/admin/AdminHeader";
import AdminPage from "./pages/admin/AdminPage";
import OrderDetails from "./pages/admin/OrderDetails";
import OnlyAdminPrivateRoute from "./components/admin/OnlyAdminPrivateRoute";
import { useSelector } from "react-redux";
import AddProduct from "./pages/admin/AddProduct";

function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <BrowserRouter>
        {user && user.role === "admin" ? <AdminHeader /> : <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/order/:orderId" element={<Order />} />
          {/* admin */}
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route
              path="/admin/order-details/:orderId"
              element={<OrderDetails />}
            />
            <Route
              path="/admin/update-product/:productId"
              element={<AddProduct />}
            />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
        {user && user.role === "admin" ? "" : <Footer />}
      </BrowserRouter>
    </>
  );
}

export default App;
