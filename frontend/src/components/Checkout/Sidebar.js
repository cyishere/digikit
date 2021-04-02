import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import formatCurrency from "../../utils/formatCurrency";
import { createOrder } from "../../slices/orderSlice";
import { clearCart } from "../../slices/cartSlice";

import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import Button from "../Button";

const Sidebar = ({ step }) => {
  const { products, subtotal, shippingFee, total } = useSelector(
    (state) => state.cart
  );
  const { token } = useSelector((state) => state.user.loginUser);

  const dispatch = useDispatch();

  const history = useHistory();

  let handleConfirmOrder;
  if (step === "payment") {
    handleConfirmOrder = async () => {
      const productInfos = products.map((product) => ({
        id: product.id,
        qty: product.qty,
      }));
      const orderInfo = { products: productInfos, value: +total };
      try {
        // console.log({ products: productInfos, value: +total, token });
        const result = await dispatch(createOrder({ orderInfo, token }));
        if (result.payload.type === "error") {
          alert(result.payload.message);
        } else {
          alert("Payment successful!");
          dispatch(clearCart());
          history.push("/orders");
        }
      } catch (error) {
        alert(error.message);
      }
    };
  }

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
    action = (
      <Button variant="secondary" onClick={handleConfirmOrder}>
        Confirm the Order
      </Button>
    );
  }
  return (
    <Wrapper>
      <div>
        <SidebarTitle>Order Summary</SidebarTitle>
        <OrderCountWrapper>
          You are ordering
          <br />
          <OrderCount>{products.length} item(s)</OrderCount>
        </OrderCountWrapper>
      </div>
      <div>
        <OrderInfo>
          <span>Subtotal:</span>
          <span>${formatCurrency(subtotal)}</span>
        </OrderInfo>
        <OrderInfo>
          <span>Shipping (Standard):</span>
          <span>${formatCurrency(shippingFee)}</span>
        </OrderInfo>
        <OrderInfo>
          <span>Total:</span>
          <TotalPrice>${formatCurrency(total)}</TotalPrice>
        </OrderInfo>
        <ButtonWrapper>{products.length > 0 && action}</ButtonWrapper>
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
