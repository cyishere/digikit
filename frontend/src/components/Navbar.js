import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (e) => setActiveItem(e.target.dataset.name);

  return (
    <Menu pointing secondary>
      <Menu.Item
        as={Link}
        to="/"
        data-name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
      >
        FunCars
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item
          as={Link}
          to="/register"
          data-name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
        >
          Register
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/login"
          data-name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
        >
          Login
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
