import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { setLocalUserToState } from "./slices/userSlice";
import { initCart } from "./slices/cartSlice";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCategoryForm from "./pages/admin/CategoryForm";
import AdminCategoryList from "./pages/admin/CategoryList";
import AdminProductList from "./pages/admin/ProductList";
import AdminProductForm from "./pages/admin/ProductForm";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import UserPage from "./features/user/UserPage";
import CategoryPage from "./features/category/CategoryPage";
import ProductList from "./features/product/ProductList";
import ProductShowPage from "./features/product/ProductShowPage";
import CartPage from "./features/checkout/CartPage";
import ShippingPage from "./features/checkout/ShippingPage";
import PaymentPage from "./features/checkout/PaymentPage";
import OrderHistory from "./pages/Order/OrderHistory";
import Page404 from "./pages/Page404";

import "./styles/App.scss";

const App = () => {
  const loginUser = useSelector((state) => state.user.loginUser);
  const cartItems = useSelector((state) => state.cart.products);

  console.log("loginUser:", loginUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("digiUser");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      dispatch(setLocalUserToState(foundUser));
    }

    const localCart = JSON.parse(localStorage.getItem("digiCart")) || [];
    if (localCart.length > 0) {
      dispatch(initCart(localCart));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="container">
        <Navbar token={loginUser.token} cartItems={cartItems} />
        <Switch>
          {loginUser.token && <Redirect exact from="/login" to="/" />}
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/user" component={UserPage} />
          <Route exact path="/product" component={ProductList} />
          <Route exact path="/product/:id" component={ProductShowPage} />
          <Route exact path="/checkout/cart">
            <CartPage cartItems={cartItems} />
          </Route>
          <Route exact path="/checkout/shipping" component={ShippingPage} />
          <Route exact path="/checkout/payment" component={PaymentPage} />
          {loginUser.token && (
            <>
              <Route exact path="/admin/category/add">
                <AdminCategoryForm token={loginUser.token} />
              </Route>
              <Route exact path="/admin/product/add">
                <AdminProductForm token={loginUser.token} />
              </Route>
              <Route exact path="/admin/category">
                <AdminCategoryList token={loginUser.token} />
              </Route>
              <Route exact path="/admin/product">
                <AdminProductList token={loginUser.token} />
              </Route>
              <Route exact path="/admin" component={AdminDashboard} />
              <Route exact path="/order" component={OrderHistory} />
              <Route exact path="/category">
                <CategoryPage token={loginUser.token} />
              </Route>
            </>
          )}
          <Route component={Page404} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
