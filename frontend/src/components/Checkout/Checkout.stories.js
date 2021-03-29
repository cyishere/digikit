/* eslint-disable import/no-anonymous-default-export */
import Layout from "../../pages/client/Checkout/Layout";
import { CartItem } from "../Cart";

export default {
  title: "Client/Checkout",
  component: Layout,
};

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

export const Cart = () => (
  <Layout step="cart">
    {products.map((product) => (
      <CartItem key={product.id} product={product} position="page" />
    ))}
  </Layout>
);

export const Shipping = () => (
  <Layout step="shipping">
    <p>Shipping info form</p>
  </Layout>
);

export const Payment = () => (
  <Layout step="payment">
    <p>Choose your payment</p>
  </Layout>
);
