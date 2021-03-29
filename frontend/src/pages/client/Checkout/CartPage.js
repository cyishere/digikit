import Layout from "./Layout";
import { CartItem } from "../../../components/Cart";

const products = [
  {
    id: "1",
    title: "GMK Maestro",
    image: "http://localhost:3000/assets/products/gmk-maestro.jpg",
    price: "134.99",
    qty: 1,
  },
  {
    id: "2",
    title: "IQUNIX L80 Formula Typing Wireless Mechanical Keyboard",
    image: "http://localhost:3000/assets/products/iqunix-f96.jpg",
    price: "265",
    qty: 1,
  },

  {
    id: "3",
    title: "IQUNIX L80 Formula Typing Wireless Mechanical Keyboard",
    image: "http://localhost:3000/assets/products/iqunix-f96.jpg",
    price: "265",
    qty: 1,
  },
];

const CartPage = () => {
  return (
    <Layout step="cart">
      {products.map((product) => (
        <CartItem key={product.id} product={product} position="page" />
      ))}
    </Layout>
  );
};

export default CartPage;
