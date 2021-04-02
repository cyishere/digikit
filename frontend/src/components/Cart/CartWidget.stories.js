/* eslint-disable import/no-anonymous-default-export */
import styled from "styled-components/macro";
import { CartWidget, CartItem, CartSpot } from "./";

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

export const Item = () => <CartItem product={product} position="page" />;

export const Spot = () => (
  <SpotWrapper>
    <CartSpot />
  </SpotWrapper>
);

const SpotWrapper = styled.div`
  width: fit-content;
  margin-left: 500px;
`;
