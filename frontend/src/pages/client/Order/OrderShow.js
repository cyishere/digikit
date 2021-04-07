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
import { Sidebar, SidebarCard } from "../../../components/Sidebar";
import PageHeader from "../../../components/PageHeader";
import ProductItem from "../../../components/ProductItem";
import Button from "../../../components/Button";
import Message from "../../../components/Message";

const OrderShow = ({ match }) => {
  const settings = [
    { id: "1", title: "Orders" },
    { id: "2", title: "Profile" },
  ];

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
      <Sidebar>
        <SidebarCard title="Settings" listContent={settings} />
      </Sidebar>
      <MainContainer>
        <PageHeader>Order Details</PageHeader>
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
