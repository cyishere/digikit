// import { useState } from "react";
// import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.scss";

// import { logoutUser } from "../features/user/userSlice";

const Navbar = () => {
  // const [activeItem, setActiveItem] = useState("home");

  // const dispatch = useDispatch();

  // const handleItemClick = (e) => setActiveItem(e.target.dataset.name);

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  //   localStorage.removeItem("funcars_user");
  // };

  return (
    <nav className="navbar">
      <div className="brand">
        <Link to="/">DigiKit</Link>
      </div>
      <ul className="navbar-nav">
        <li className="navbar-nav__item">
          <NavLink to="/" exact={true}>Home</NavLink>
        </li>
        <li className="navbar-nav__item">
          <NavLink to="/register">Register</NavLink>
        </li>
        <li className="navbar-nav__item">
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
