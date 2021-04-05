import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../slices/userSlice";
import { initCart } from "../slices/cartSlice";

import GlobalStyles from "../styles/GlobalStyles";
import Home from "../pages/client/Home";
import Login from "../pages/client/Login";
import Signup from "../pages/client/Signup";
import { ProductList, ProductShow } from "../pages/client/Product";
import {
  CheckoutCart,
  CheckoutShipping,
  CheckoutPayment,
} from "../pages/client/Checkout";
import { OrderList, OrderShow } from "../pages/client/Order";
import {
  Dashboard,
  ProductList as AdminProducts,
  OrderList as AdminOrders,
  CategoryList,
  UserList,
} from "../pages/admin";

const App = () => {
  const loginUser = useSelector((state) => state.user.loginUser);
  const cartItems = useSelector((state) => state.cart.products);

  const dispatch = useDispatch();

  useEffect(() => {
    const localUser = localStorage.getItem("digiUser");
    if (localUser && !loginUser.userId) {
      dispatch(getUserInfo(JSON.parse(localUser)));
    }

    const localCart = JSON.parse(localStorage.getItem("digiCart")) || [];
    if (localCart.length > 0 && cartItems.length === 0) {
      dispatch(initCart(localCart));
    }
  }, [cartItems, dispatch, loginUser.userId]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/products" component={ProductList} />
        <Route exact path="/products/:productId" component={ProductShow} />
        <Route exact path="/checkout/cart" component={CheckoutCart} />
        <Route exact path="/checkout/shipping" component={CheckoutShipping} />
        <Route exact path="/checkout/payment" component={CheckoutPayment} />
        <Route exact path="/orders" component={OrderList} />
        <Route exact path="/orders/:orderId" component={OrderShow} />
        <Route exact path="/admin/dashboard" component={Dashboard} />
        <Route exact path="/admin/products" component={AdminProducts} />
        <Route exact path="/admin/orders" component={AdminOrders} />
        <Route exact path="/admin/categories" component={CategoryList} />
        <Route exact path="/admin/users" component={UserList} />
      </Switch>
      <GlobalStyles />
    </Router>
  );
};

export default App;
