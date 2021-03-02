import { useState } from "react";
import CartIcon from "./CartIcon";
import CartWidget from "./CartWidget";

const CartSpot = () => {
  const [showWidget, setShowWidget] = useState(false);

  const handleShowWidget = () => setShowWidget(!showWidget);

  return (
    <li className="navbar-nav__item" style={{ position: "relative" }}>
      <CartIcon handleShowWidget={handleShowWidget} />
      <CartWidget show={showWidget} />
    </li>
  );
};

export default CartSpot;
