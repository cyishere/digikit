import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { setLocalUserToState } from "./features/user/userSlice";
import Navbar from "./components/Navbar/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer/Footer";
import ProductPage from "./features/product/ProductPage";
import UserPage from "./features/user/UserPage";
import CategoryPage from "./features/category/CategoryPage";
import ProductList from "./features/product/ProductList";
import ProductShowPage from "./features/product/ProductShowPage";
import ProductForm from "./features/product/ProductForm";
import Page404 from "./pages/Page404";

import "./styles/App.scss";

const App = () => {
  const loginUser = useSelector((state) => state.user.loginUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("digiUser");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      dispatch(setLocalUserToState(foundUser));
    }
  }, []);

  return (
    <Router>
      <div className="container">
        <Navbar token={loginUser.token} />
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

          <Route component={Page404} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
