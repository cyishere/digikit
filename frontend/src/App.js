import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Container } from "semantic-ui-react";
import Navbar from "./components/Navbar";
import CarList from "./components/CarList";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Container>
      <Navbar />
      <CarList />
      <Footer />
    </Container>
  );
};

export default App;
