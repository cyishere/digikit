import { useLocation } from "react-router-dom";
import Layout from "./Layout";
import CartItem from "../../components/Cart/CartItem";
import CartSidebarLayout from "../../components/Cart/CartSidebarLayout";
import LinkButton from "../../components/Button/LinkButton";
import "../../styles/grid.scss";
import "./Checkout.scss";

const CartPage = ({ cartItems }) => {
  console.log("cartItems:", cartItems);
  const location = useLocation();
  const path = location.pathname.split("/");

  return (
    <Layout path={path} pageTitle="Shipping Cart">
      <div className="checkout-page__body">
        {cartItems.length === 0 ? (
          <p>Shopping cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
          </>
        )}
      </div>

      <CartSidebarLayout>
        <LinkButton styleStatus="primary" toDirection="/checkout/shipping">
          Proceed to Checkout
        </LinkButton>
      </CartSidebarLayout>
    </Layout>
  );
};

export default CartPage;
