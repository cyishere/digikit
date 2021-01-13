import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Container } from "semantic-ui-react";
import Navbar from "./components/Navbar";
import CarList from "./features/car/CarList";
import CarPage from "./features/car/CarPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import CarAdminList from "./features/car/CarAdminList";
import Footer from "./components/Footer";

import { setLocalUserToState } from "./features/user/userSlice";

const App = () => {
  const user = useSelector((state) => state.user.loginUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("funcars_user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      dispatch(setLocalUserToState(foundUser));
    }
  }, []);

  return (
    <Router>
      <Container>
        <Navbar user={user} />
        <Switch>
          <Route exact path="/" component={CarList} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin">
            <Admin user={user} />
          </Route>
          <Route exact path="/car/:id" component={CarPage} />
          <Route exact path="/admin/car" component={CarAdminList} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
