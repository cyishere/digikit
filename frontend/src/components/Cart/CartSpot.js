import { useState } from "react";
import CartIcon from "./CartIcon";
import CartWidget from "./CartWidget";

const CartSpot = ({ cartItems }) => {
  const [showWidget, setShowWidget] = useState(false);

  return (
    <li
      className="navbar-nav__item"
      style={{ position: "relative" }}
      onMouseOver={() => setShowWidget(true)}
      onMouseOut={() => setShowWidget(false)}
    >
      <CartIcon cartItems={cartItems} />
      <CartWidget show={showWidget} cartItems={cartItems} />
    </li>
  );
};

export default CartSpot;
