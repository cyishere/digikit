import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Home from "./pages/client/Home";
import Login from "./pages/client/Login";
import Signup from "./pages/client/Signup";
import ProductList from "./pages/client/ProductList";
import ProductShow from "./pages/client/ProductShow";
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
      </Switch>
      <GlobalStyles />
    </Router>
  );
};

export default App;
