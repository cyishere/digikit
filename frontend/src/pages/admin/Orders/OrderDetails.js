import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import formatCurrency from "../../../utils/formatCurrency";
import { selectOrderById, updateOrderStatus } from "../../../slices/orderSlice";
import { selectLoginUser } from "../../../slices/userSlice";
import fetchStates from "../../../utils/fetchStates";

import styled from "styled-components/macro";
import { COLORS } from "../../../styles/constants";
import { SubLayout as Layout } from "../../../components/Admin";
import TextLink from "../../../components/TextLink";
import ProductItem from "../../../components/ProductItem";
import Button from "../../../components/Button";
import Message from "../../../components/Message";

const OrderDetails = ({ match }) => {
  const { orderId } = match.params;
  const shippingFee = useSelector((state) => state.cart.shippingFee);
  const order = useSelector((state) => selectOrderById(state, orderId));
  const message = useSelector((state) => state.order.message);
  const { products } = order;

  const [orderStatus, setOrderStatus] = useState(order.status);
  const [requestStatus, setRequestStatus] = useState(fetchStates.idle);
  const { token } = useSelector(selectLoginUser);

  const dispatch = useDispatch();

  const handleOrderStatusChange = (e) => {
    setOrderStatus(e.target.value);
  };

  const handleSubmitStatusChange = async (e) => {
    e.preventDefault();

    try {
      const orderInfo = {
        id: orderId,
        status: orderStatus,
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
    <Layout pageTitle="Order Details">
      <TextLink to="/admin/orders">&larr; Back to order list</TextLink>

      {requestStatus === fetchStates.error && (
        <Message variant="danger">{message}</Message>
      )}
      {requestStatus === fetchStates.success && (
        <Message variant="success">{message}</Message>
      )}

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
          {orderStatus !== "Cancelled" ? (
            <form onSubmit={handleSubmitStatusChange}>
              <input
                type="radio"
                id="new"
                name="status"
                value="New"
                onChange={handleOrderStatusChange}
                checked={orderStatus === "New"}
              />
              <RadioLabel htmlFor="new">New</RadioLabel>
              <input
                type="radio"
                id="shipped"
                name="status"
                value="Shipped"
                onChange={handleOrderStatusChange}
                checked={orderStatus === "Shipped"}
              />
              <RadioLabel htmlFor="shipped">Shipped</RadioLabel>
              <input
                type="radio"
                id="completed"
                name="status"
                value="Completed"
                onChange={handleOrderStatusChange}
                checked={orderStatus === "Completed"}
              />
              <RadioLabel htmlFor="completed">Completed</RadioLabel>

              <Button variant="info" type="submit">
                Save Change
              </Button>
            </form>
          ) : (
            orderStatus
          )}
        </Content>
      </ContentContainer>
    </Layout>
  );
};

const ContentContainer = styled.dl`
  /* border-bottom: 8px solid ${COLORS.grayLightDim}; */
  margin-bottom: 16px;
  margin-top: 48px;
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

const RadioLabel = styled.label`
  margin-right: 16px;
`;

export default OrderDetails;
