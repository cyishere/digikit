import CartItem from "./CartItem";
import "./CartWidget.scss";
import "../../styles/button.scss";

const CartWidget = ({ show }) => {
  return (
    <div className={`cart-widget ${show ? "show" : ""}`}>
      <div className="cart-widget__header">
        <h2 className="cart-widget__header-title">Recently added items (3)</h2>
      </div>
      <div className="cart-widget__body">
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
      <div className="cart-widget__footer">
        <div className="cart-widget__meta">
          <h4 className="title">Cart Subtotal:</h4>
          <div className="cost">$795.00</div>
        </div>
        <button className="button button-primary">
          <i className="la la-cart-arrow-down"></i> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CartWidget;
