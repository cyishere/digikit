import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { logoutUser } from "../features/user/userSlice";

const Navbar = ({ user }) => {
  const [activeItem, setActiveItem] = useState("home");

  const dispatch = useDispatch();

  const handleItemClick = (e) => setActiveItem(e.target.dataset.name);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("funcars_user");
  };

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
        {user ? (
          <>
            <Menu.Item
              as={Link}
              to={`/user/${user.id}`}
              data-name="user"
              active={activeItem === "user"}
              onClick={handleItemClick}
            >
              {user.username}
            </Menu.Item>
            <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
          </>
        ) : (
          <>
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
          </>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
