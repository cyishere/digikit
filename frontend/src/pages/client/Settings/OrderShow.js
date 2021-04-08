import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { selectOrderById, updateOrderStatus } from "../../../slices/orderSlice";
import { selectLoginUser } from "../../../slices/userSlice";
import formatCurrency from "../../../utils/formatCurrency";
import fetchStates from "../../../utils/fetchStates";

import styled from "styled-components/macro";
import { COLORS } from "../../../styles/constants";
import SubLayout from "../SubLayout";
import SideMenu from "./SideMenu";
import PageHeader from "../../../components/PageHeader";
import ProductItem from "../../../components/ProductItem";
import Button from "../../../components/Button";
import Message from "../../../components/Message";
import { BackLinkWrapper } from "../../../components/Utils";
import TextLink from "../../../components/TextLink";

const OrderShow = ({ match, location }) => {
  const { orderId } = match.params;
  const order = useSelector((state) => selectOrderById(state, orderId));
  const shippingFee = useSelector((state) => state.cart.shippingFee);
  const message = useSelector((state) => state.order.message);
  const { products } = order;

  const { token } = useSelector(selectLoginUser);

  const [requestStatus, setRequestStatus] = useState(fetchStates.idle);

  const dispatch = useDispatch();

  const handleCancelOrder = async () => {
    try {
      const orderInfo = {
        id: orderId,
        status: "Cancelled",
      };

      const actionResult = await dispatch(
        updateOrderStatus({ orderInfo, token })
      );
      const result = unwrapResult(actionResult);

      if (result.type === fetchStates.error) {
        setRequestStatus(fetchStates.error);
      } else {
        setRequestStatus(fetchStates.success);
      }
    } catch (error) {
      setRequestStatus(fetchStates.error);
    }
  };

  return (
    <SubLayout>
      <SideMenu location={location} />
      <MainContainer>
        <PageHeader>Order Details</PageHeader>

        <BackLinkWrapper>
          <TextLink to="/orders">&larr; Back to Order List</TextLink>
        </BackLinkWrapper>

        <ContentContainer>
          <Title>Order Number</Title>
          <Content>{order.number}</Content>
          <Title>Place On</Title>
          <Content>{new Date(order.createdAt).toLocaleString()}</Content>
          <Title>Products in Order</Title>
          <Content>
            <ul>
              {products.map(({ id, qty }) => (
                <ProductItem productId={id} qty={qty} key={id} />
              ))}
            </ul>
          </Content>
          <Title>Total Price</Title>
          <Content>
            $<Em>{formatCurrency(order.value)}</Em> (Including $
            {formatCurrency(shippingFee)} shipping fee)
          </Content>
          <Title>Order Status</Title>
          <Content>
            <p>{order.status}</p>
          </Content>
        </ContentContainer>
        <Button variant="danger" type="button" onClick={handleCancelOrder}>
          Cancel the Order
        </Button>

        {requestStatus === fetchStates.error && (
          <Message variant="danger">{message}</Message>
        )}
        {requestStatus === fetchStates.success && (
          <Message variant="success">{message}</Message>
        )}
      </MainContainer>
    </SubLayout>
  );
};

const MainContainer = styled.main`
  background-color: ${COLORS.white};
  border-top: 8px solid ${COLORS.grayLight};
  padding: 36px;
`;

const ContentContainer = styled.dl`
  /* border-bottom: 8px solid ${COLORS.grayLightDim}; */
  margin-bottom: 16px;
`;

const Title = styled.dt`
  text-transform: uppercase;
  color: ${COLORS.textLight};
  margin-bottom: 16px;
`;

const Content = styled.dd`
  margin-bottom: 32px;
`;

const Em = styled.em`
  color: ${COLORS.secondary};
`;

export default OrderShow;
