import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import ProductPage from "./components/ProductPage/ProductPage";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import AboutUs from "./components/AboutUs/AboutUs";
import Cart from "./components/Cart/Cart";
import MainPage from "./Admin/MainPage";
import AdminOutlet from "./outlet/AdminOutlet";
import MainOutlet from "./outlet/MainOutlet";
import AdminHome from "./Admin/AdminHome";
import AdminProducts from "./Admin/ProductsPage/AdminProducts";
import Slider from "./Admin/Slider";
import Customers from "./Admin/Customers";
import Reviews from "./Admin/Reviews";
import EditProduct from "./Admin/ProductsPage/EditProduct";
import CouponCode from "./Admin/CouponCode";
import PaymentGateway from "./components/PaymentGateway/PaymentGateway";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainOutlet />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/productDetails/:id" element={<ProductDetails />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<PaymentGateway />} />
          </Route>
          <Route path="/admin" element={<AdminOutlet />}>
            <Route path="/admin" element={<MainPage />} />
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/slider" element={<Slider />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/reviews" element={<Reviews />} />
            <Route path="/admin/editproduct/:id" element={<EditProduct />} />
            <Route path="/admin/coupons" element={<CouponCode />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
