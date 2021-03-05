import { useLocation } from "react-router-dom";
import Layout from "./Layout";
import CartItem from "../../components/Cart/CartItem";
import "../../styles/grid.scss";
import "./Checkout.scss";

const CartPage = ({ cartItems }) => {
  console.log("cartItems:", cartItems);
  const location = useLocation();
  const path = location.pathname.split("/");

  return (
    <Layout
      path={path}
      pageTitle="Shipping Cart"
      proceedText="Proceed to Checkout"
    >
      {cartItems.length === 0 ? (
        <p>Shopping cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.id} product={item} />
          ))}
        </>
      )}
    </Layout>
  );
};

export default CartPage;
