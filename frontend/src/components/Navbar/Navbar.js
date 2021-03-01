import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import CartIcon from "../Cart/CartIcon";
import "./Navbar.scss";
import "../../styles/button.scss";

import { logoutUser } from "../../features/user/userSlice";

const CartLi = () => (
  <li className="navbar-nav__item">
    <CartIcon />
  </li>
);

const Navbar = ({ token }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("digiUser");
  };

  const showLink = token ? (
    <li className="navbar-nav__item">
      <button className="button button-link" onClick={handleLogout}>
        Logout
      </button>
    </li>
  ) : (
    <>
      <li className="navbar-nav__item">
        <NavLink to="/register">Register</NavLink>
      </li>
      <li className="navbar-nav__item">
        <NavLink to="/login">Login</NavLink>
      </li>
      <CartLi />
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">DigiKit</Link>
      </div>
      <ul className="navbar-nav">
        <li className="navbar-nav__item">
          <NavLink to="/" exact={true}>
            Home
          </NavLink>
        </li>
        <li className="navbar-nav__item">
          <NavLink to="/product">Producs</NavLink>
        </li>
        {showLink}
        <CartLi />
      </ul>
    </nav>
  );
};

export default Navbar;
