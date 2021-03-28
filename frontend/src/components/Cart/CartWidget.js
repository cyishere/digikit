import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import CartWidgetContent from "./CartWidgetContent";
import Button from "../Button";

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
];

const CartWidget = () => {
  return (
    <Wrapper>
      <Title>
        <TitleText>Recently added items (6)</TitleText>
      </Title>
      <CartWidgetContent products={products} position="widget" />
      <Footer>
        <Subtotal>
          <span>Subtotal:</span>
          <strong>$538.00</strong>
        </Subtotal>
        <Button variant="secondary">Checkout</Button>
      </Footer>
    </Wrapper>
  );
};

export const Wrapper = styled.aside`
  width: 320px;
  border: 1px solid ${COLORS.primary};
`;

const Title = styled.div`
  background-color: ${COLORS.grayLight};
  padding: 16px;
`;

const TitleText = styled.h3`
  font-size: 1rem;
  text-transform: uppercase;
`;

const Footer = styled.div`
  background-color: ${COLORS.grayLight};
  padding: 16px;
`;

const Subtotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default CartWidget;
