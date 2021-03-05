import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { setLocalUserToState } from "./features/user/userSlice";
import { initCart } from "./features/checkout/cartSlice";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import ProductPage from "./features/product/ProductPage";
import UserPage from "./features/user/UserPage";
import CategoryPage from "./features/category/CategoryPage";
import ProductList from "./features/product/ProductList";
import ProductShowPage from "./features/product/ProductShowPage";
import ProductForm from "./features/product/ProductForm";
import CartPage from "./features/checkout/CartPage";
import ShippingPage from "./features/checkout/ShippingPage";
import PaymentPage from "./features/checkout/PaymentPage";
import Page404 from "./pages/Page404";

import "./styles/App.scss";

const App = () => {
  const loginUser = useSelector((state) => state.user.loginUser);
  const cartItems = useSelector((state) => state.cart.products);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("digiUser");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      dispatch(setLocalUserToState(foundUser));
    }

    const localCart = JSON.parse(localStorage.getItem("digiCart")) || [];
    console.log("localCart:", localCart[0].countInStock);
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
          <Route exact path="/" component={ProductPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/user" component={UserPage} />
          {loginUser.token && (
            <Route exact path="/category">
              <CategoryPage token={loginUser.token} />
            </Route>
          )}
          <Route exact path="/product/add">
            <ProductForm token={loginUser.token} />
          </Route>
          <Route exact path="/product/:id" component={ProductShowPage} />
          <Route exact path="/product" component={ProductList} />
          <Route exact path="/checkout/cart">
            <CartPage cartItems={cartItems} />
          </Route>
          <Route exact path="/checkout/shipping" component={ShippingPage} />
          <Route exact path="/checkout/payment" component={PaymentPage} />
          <Route component={Page404} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
