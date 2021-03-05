import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import CartSpot from "../Cart/CartSpot";
import "./Navbar.scss";
import "../../styles/button.scss";

import { logoutUser } from "../../features/user/userSlice";

const Navbar = ({ token, cartItems }) => {
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
        {/* TODO: Remove this */}
        <li className="navbar-nav__item">
          <NavLink to="/checkout/cart">Cart</NavLink>
        </li>
        {showLink}
        <CartSpot cartItems={cartItems} />
      </ul>
    </nav>
  );
};

export default Navbar;
