import { useSelector } from "react-redux";
import formatCurrency from "../../../utils/formatCurrency";
import { selectOrderById } from "../../../slices/orderSlice";

import styled from "styled-components/macro";
import { COLORS } from "../../../styles/constants";
import { SubLayout as Layout } from "../../../components/Admin";
import TextLink from "../../../components/TextLink";
import ProductItem from "../../../components/ProductItem";
import Button from "../../../components/Button";

const OrderDetails = ({ match }) => {
  const { orderId } = match.params;
  const shippingFee = useSelector((state) => state.cart.shippingFee);
  const order = useSelector((state) => selectOrderById(state, orderId));
  const { products } = order;

  return (
    <Layout pageTitle="Order Details">
      <TextLink to="/admin/orders">&larr; Back to order list</TextLink>
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
          <input
            type="radio"
            id="new"
            name="status"
            value="new"
            checked={order.status.toLocaleLowerCase() === "new"}
          />
          <RadioLabel htmlFor="new">New</RadioLabel>
          <input
            type="radio"
            id="shipped"
            name="status"
            value="shipped"
            checked={order.status.toLocaleLowerCase() === "shipped"}
          />
          <RadioLabel htmlFor="shipped">Shipped</RadioLabel>
          <input
            type="radio"
            id="completed"
            name="status"
            value="completed"
            checked={order.status.toLocaleLowerCase() === "completed"}
          />
          <RadioLabel htmlFor="completed">Completed</RadioLabel>
          <input
            type="radio"
            id="cancelled"
            name="status"
            value="cancelled"
            checked={order.status.toLocaleLowerCase() === "cancelled"}
          />
          <RadioLabel htmlFor="cancelled">Cancelled</RadioLabel>
          <Button variant="info">Save Change</Button>
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
