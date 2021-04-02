import { useSelector } from "react-redux";
import { selectOrderById } from "../../../slices/orderSlice";
import formatCurrency from "../../../utils/formatCurrency";

import styled from "styled-components/macro";
import { COLORS } from "../../../styles/constants";
import SubLayout from "../SubLayout";
import { Sidebar, SidebarCard } from "../../../components/Sidebar";
import PageHeader from "../../../components/PageHeader";
import ProductItem from "../../../components/ProductItem";

const OrderShow = ({ match }) => {
  const settings = [
    { id: "1", title: "Orders" },
    { id: "2", title: "Profile" },
  ];

  const { orderId } = match.params;
  const order = useSelector((state) => selectOrderById(state, orderId));
  const shippingFee = useSelector((state) => state.cart.shippingFee);

  const { products } = order;

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
          <Title>Order Status</Title>
          <Content>{order.status}</Content>
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
        </ContentContainer>
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
