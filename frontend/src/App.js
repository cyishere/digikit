import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Container } from "semantic-ui-react";
import Navbar from "./components/Navbar";
import CarList from "./features/car/CarList";
import CarPage from "./features/car/CarPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Container>
        <Navbar />
        <Switch>
          <Route exact path="/" component={CarList} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cars/:id" component={CarPage} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
