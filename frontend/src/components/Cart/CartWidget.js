import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import formatCurrency from "../../utils/formatCurrency";
import CartItem from "./CartItem";
import "./CartWidget.scss";
import "../../styles/button.scss";

const CartWidget = ({ show, cartItems }) => {
  const subtotal = useSelector((state) => state.cart.subtotal);

  return (
    <div className={`cart-widget ${show ? "show" : ""}`}>
      <div className="cart-widget__header">
        <h2 className="cart-widget__header-title">
          Recently added items ({cartItems.length})
        </h2>
      </div>
      <div className="cart-widget__body">
        {cartItems.length === 0 ? (
          <p style={{ padding: "10px" }}>Shopping cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <CartItem styleStatus="small" key={item.id} product={item} />
            ))}
          </>
        )}
      </div>
      <div className="cart-widget__footer">
        <div className="cart-widget__meta">
          <h4 className="title">Cart Subtotal:</h4>
          <div className="cost">${formatCurrency(subtotal)}</div>
        </div>

        <Link className="button button-primary" to="/checkout/cart">
          <i className="la la-shopping-bag"></i> Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartWidget;
