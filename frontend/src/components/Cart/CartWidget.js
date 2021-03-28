import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import CartItem from "./CartItem";
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

  {
    id: "3",
    title: "IQUNIX L80 Formula Typing Wireless Mechanical Keyboard",
    image: "http://localhost:3000/assets/products/iqunix-f96.jpg",
    price: "265",
    qty: 1,
  },
];

const CartWidget = () => {
  return (
    <Wrapper className="widget">
      <Title>
        <TitleText>Recently added items (6)</TitleText>
      </Title>
      <Section>
        {products.map((product) => (
          <CartItem key={product.id} product={product} position="widget" />
        ))}
      </Section>
      <Footer>
        <Subtotal>
          <span>Subtotal:</span>
          <SubtotalPrice>
            $<Em>538.00</Em>
          </SubtotalPrice>
        </Subtotal>
        <Control>
          <Button variant="secondary" href="/checkout/cart">
            Checkout
          </Button>
        </Control>
      </Footer>
    </Wrapper>
  );
};

export const Wrapper = styled.aside`
  width: 320px;
  border: 1px solid ${COLORS.primary};
  position: absolute;
  right: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: none;
`;

const Title = styled.div`
  background-color: ${COLORS.grayLight};
  padding: 16px;
`;

const TitleText = styled.h3`
  font-size: 1rem;
  text-transform: uppercase;
`;

const Section = styled.section`
  padding: 16px;
  background-color: ${COLORS.white};
  max-height: 360px;
  overflow-y: scroll;
`;

const Footer = styled.div`
  background-color: ${COLORS.grayLight};
  padding: 16px;
`;

const Subtotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const SubtotalPrice = styled.span`
  color: ${COLORS.textLight};
`;

const Em = styled.em`
  color: ${COLORS.secondary};
`;

const Control = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
`;

export default CartWidget;
