/* eslint-disable import/no-anonymous-default-export */
import { CartWidget, CartItem } from "./";

export default {
  title: "Client/Cart",
  component: CartWidget,
};

const product = {
  id: "2",
  title: "IQUNIX L80 Formula Typing Wireless Mechanical Keyboard",
  image: "http://localhost:3000/assets/products/iqunix-f96.jpg",
  price: "265",
  qty: 1,
};

export const Widget = () => <CartWidget />;

export const Item = () => <CartItem product={product} position="page" />;
