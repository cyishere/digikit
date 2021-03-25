import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Home from "./pages/client/Home";
import Login from "./pages/client/Login";
import Signup from "./pages/client/Signup";
import Dashboard from "./pages/admin/Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/admin" component={Dashboard} />
      </Switch>
      <GlobalStyles />
    </Router>
  );
};

export default App;
