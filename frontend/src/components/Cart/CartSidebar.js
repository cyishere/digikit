import { useSelector } from "react-redux";
import formatCurrency from "../../utils/formatCurrency";
import LinkButton from "../../components/Button/LinkButton";

const CartSidebar = ({ text }) => {
  const { products, subtotal, shippingFee, total } = useSelector(
    (state) => state.cart
  );

  return (
    <aside className="checkout-page__sidebar">
      <h3 className="checkout-page__sidebar-title">Order Summary</h3>
      <div className="order-status">
        <p>You are ordering</p>
        <p>
          <strong>{products.length} Item(s)</strong>
        </p>
      </div>
      <ul className="price-status">
        <div className="price-status__item">
          <span>Subtotal</span>
          <span>${formatCurrency(subtotal)}</span>
        </div>
        <div className="price-status__item">
          <span>Shipping (Standard)</span>
          <span>${formatCurrency(shippingFee)}</span>
        </div>
        <div className="price-status__item">
          <span>
            <strong>Total</strong>
          </span>
          <span>
            <strong>
              ${subtotal === 0 ? formatCurrency(0) : formatCurrency(total)}
            </strong>
          </span>
        </div>
      </ul>

      {products.length > 0 && (
        <LinkButton styleStatus="primary" toDirection="/checkout/shipping">
          {text}
        </LinkButton>
      )}
    </aside>
  );
};

export default CartSidebar;
