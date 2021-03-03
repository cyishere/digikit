import PageHeader from "../../components/PageHeader";
import CheckoutStatus from "../../components/CheckoutStatus";
import CartItem from "../../components/Cart/CartItem";
import CartSidebar from "../../components/Cart/CartSidebar";
import "../../styles/grid.scss";
import "./CartPage.scss";

const CartPage = () => {
  return (
    <main className="main cart-page">
      <CheckoutStatus status="step1" />

      <PageHeader>
        <i className="las la-shopping-cart"></i> Shopping Cart
      </PageHeader>

      <section className="section grid sw-3-1">
        <div className="cart-page__body">
          <CartItem />
          <CartItem />
          <CartItem />
        </div>

        <CartSidebar />
      </section>
    </main>
  );
};

export default CartPage;
