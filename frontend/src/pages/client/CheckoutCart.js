import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import Layout from "./Layout";
import PageHeader from "../../components/PageHeader";
import { CartItem } from "../../components/Cart";
import Button from "../../components/Button";

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

const CheckoutCart = () => {
  return (
    <Layout>
      <Wrapper>
        <MainContainer>
          <PageHeader>Shopping Cart</PageHeader>
          <Section>
            {products.map((product) => (
              <CartItem key={product.id} product={product} position="page" />
            ))}
          </Section>
        </MainContainer>
        <Sidebar>
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
            <ButtonWrapper>
              <Button variant="secondary" href="/checkout/shipping">
                Proceed to Checkout
              </Button>
            </ButtonWrapper>
          </div>
        </Sidebar>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 360px;
`;

const MainContainer = styled.main`
  background-color: ${COLORS.white};
  border-top: 8px solid ${COLORS.grayLight};
  padding: 36px;
`;

const Section = styled.section`
  border-top: 8px solid ${COLORS.grayLight};
  padding-top: 36px;
`;

const Sidebar = styled.aside`
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

export default CheckoutCart;
