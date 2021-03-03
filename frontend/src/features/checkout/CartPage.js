import Layout from "./Layout";
import CartItem from "../../components/Cart/CartItem";
import "../../styles/grid.scss";
import "./Checkout.scss";

const CartPage = (props) => {
  const path = props.location.pathname.split("/");

  return (
    <Layout
      path={path}
      pageTitle="Shipping Cart"
      proceedText="Proceed to Checkout"
    >
      <CartItem />
      <CartItem />
      <CartItem />
    </Layout>
  );
};

export default CartPage;
