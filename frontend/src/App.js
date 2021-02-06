// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./styles/App.scss";

import Navbar from "./components/Navbar/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer/Footer";
import ProductPage from "./features/product/ProductPage";

const App = () => {
  // const user = useSelector((state) => state.user.loginUser);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("funcars_user");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     dispatch(setLocalUserToState(foundUser));
  //   }
  // }, []);

  return (
    <Router>
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
