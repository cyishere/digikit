import { useSelector } from "react-redux";

import Layout from "./Layout";
import { CartItem } from "../../../components/Cart";

const CartPage = () => {
  const { products } = useSelector((state) => state.cart);

  return (
    <Layout step="cart">
      {products.length < 1 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {products.map((product) => (
            <CartItem key={product.id} product={product} position="page" />
          ))}
        </>
      )}
    </Layout>
  );
};

export default CartPage;
