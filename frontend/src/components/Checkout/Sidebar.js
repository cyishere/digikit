import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import Button from "../Button";

const Sidebar = ({ step }) => {
  let action;

  if (step === "cart") {
    action = (
      <Button variant="secondary" href="/checkout/shipping">
        Proceed to Checkout
      </Button>
    );
  } else if (step === "shipping") {
    action = (
      <Button variant="secondary" href="/checkout/payment">
        Proceed to Billing
      </Button>
    );
  } else if (step === "payment") {
    action = <Button variant="secondary">Confirm the Order</Button>;
  }
  return (
    <Wrapper>
      <div>
        <SidebarTitle>Order Summary</SidebarTitle>
        <OrderCountWrapper>
          You are ordering
          <br />
          <OrderCount>6 item(s)</OrderCount>
        </OrderCountWrapper>
      </div>
      <div>
        <OrderInfo>
          <span>Subtotal:</span>
          <span>$538.00</span>
        </OrderInfo>
        <OrderInfo>
          <span>Shipping (Standard):</span>
          <span>$8.00</span>
        </OrderInfo>
        <OrderInfo>
          <span>Total:</span>
          <TotalPrice>$546.00</TotalPrice>
        </OrderInfo>
        <ButtonWrapper>{action}</ButtonWrapper>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px;
`;

const SidebarTitle = styled.h2`
  font-size: 1.25rem;
  text-align: center;
  text-transform: uppercase;
  color: ${COLORS.textLight};
  margin-bottom: 36px;
`;

const OrderCountWrapper = styled.p`
  line-height: 1.6;
`;

const OrderCount = styled.strong`
  font-size: 2rem;
`;

const OrderInfo = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const TotalPrice = styled.em`
  font-size: 1.25rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
`;

export default Sidebar;
