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

import "./styles/App.scss";

const App = () => {
  const loginUser = useSelector((state) => state.user.loginUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("digiUser");
    console.log("loggedInUser:", loggedInUser);
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
          <Route exact path="/category">
            <CategoryPage token={loginUser.token} />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
