import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Home from "./pages/client/Home";
import Login from "./pages/client/Login";
import Signup from "./pages/client/Signup";
import { ProductList, ProductShow } from "./pages/client/Product";
import {
  CheckoutCart,
  CheckoutShipping,
  CheckoutPayment,
} from "./pages/client/Checkout";
import { OrderList } from "./pages/client/Order";
import Dashboard from "./pages/admin/Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/products" component={ProductList} />
        <Route exact path="/admin" component={Dashboard} />
        <Route exact path="/products/:productId" component={ProductShow} />
        <Route exact path="/checkout/cart" component={CheckoutCart} />
        <Route exact path="/checkout/shipping" component={CheckoutShipping} />
        <Route exact path="/checkout/payment" component={CheckoutPayment} />
        <Route exact path="/orders" component={OrderList} />
      </Switch>
      <GlobalStyles />
    </Router>
  );
};

export default App;
