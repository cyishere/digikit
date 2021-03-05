import CartItem from "./CartItem";
import Button from "../Button";
import "./CartWidget.scss";

const CartWidget = ({ show, cartItems }) => {
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
          <div className="cost">$795.00</div>
        </div>
        <Button styleStatus="primary">
          <i className="la la-shopping-bag"></i> Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartWidget;
