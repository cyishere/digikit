import PageHeader from "../../components/PageHeader/PageHeader";
import CartItem from "../../components/Cart/CartItem";
import Button from "../../components/Button/Button";
import "../../styles/grid.scss";
import "./CartPage.scss";

const CartPage = () => {
  return (
    <main className="main cart-page">
      <PageHeader>
        <i className="las la-shopping-cart"></i> Shopping Cart
      </PageHeader>

      <section className="section grid sw-3-1">
        <div className="cart-page__body">
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <aside className="cart-page__sidebar">
          <h3 className="cart-page__sidebar-title">Order Summary</h3>
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
      </section>
    </main>
  );
};

export default CartPage;
