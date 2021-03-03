import Button from "../../components/Button";

const CartSidebar = () => {
  return (
    <aside className="checkout-page__sidebar">
      <h3 className="checkout-page__sidebar-title">Order Summary</h3>
      <div className="order-status">
        <p>You are ordering</p>
        <p>
          <strong>3 Item(s)</strong>
        </p>
      </div>
      <ul className="price-status">
        <div className="price-status__item">
          <span>Subtotal</span>
          <span>$795.00</span>
        </div>
        <div className="price-status__item">
          <span>Shipping (Standard)</span>
          <span>$10.00</span>
        </div>
        <div className="price-status__item">
          <span>
            <strong>Total</strong>
          </span>
          <span>
            <strong>$805.00</strong>
          </span>
        </div>
      </ul>
      <Button styleStatus="primary">Proceed to Checkout</Button>
    </aside>
  );
};

export default CartSidebar;
