import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import CartItem from "./CartItem";

const CartWidgetContent = ({ products, position }) => {
  return (
    <Section>
      {products.map((product) => (
        <CartItem product={product} position={position} />
      ))}
    </Section>
  );
};

const Section = styled.section`
  padding: 16px;
  background-color: ${COLORS.white};
`;

export default CartWidgetContent;
