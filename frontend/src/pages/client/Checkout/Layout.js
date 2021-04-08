import styled from "styled-components/macro";
import { COLORS, VIEWS, BREAKPOINTS } from "../../../styles/constants";
import AppLayout from "../Layout";
import PageHeader from "../../../components/PageHeader";
import { Sidebar } from "../../../components/Checkout";
import { Breadcrumbs, Crumb } from "../../../components/Breadcrumbs";
import TextLink from "../../../components/TextLink";

const Layout = ({ children, step }) => {
  let pageTitle;

  if (step === "cart") {
    pageTitle = "Shopping Cart";
  } else if (step === "shipping") {
    pageTitle = "Shipping Info";
  } else if (step === "payment") {
    pageTitle = "Payment";
  } else {
    throw new Error("Unknow page");
  }

  return (
    <AppLayout>
      <Wrapper>
        <MainContainer>
          <Breadcrumbs>
            <Crumb>
              <TextLink to="/">Home</TextLink>
            </Crumb>
            <Crumb>
              <TextLink to="/checkout/cart">Checkout</TextLink>
            </Crumb>
            <Crumb>{pageTitle}</Crumb>
          </Breadcrumbs>
          <PageHeader>{pageTitle}</PageHeader>
          <Content>{children}</Content>
        </MainContainer>
        <Sidebar step={step} />
      </Wrapper>
    </AppLayout>
  );
};

const Wrapper = styled.div`
  max-width: ${VIEWS.lg};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 360px;

  @media ${BREAKPOINTS.md} {
    grid-template-columns: 1fr;
  }
`;

const MainContainer = styled.main`
  background-color: ${COLORS.white};
  border-top: 8px solid ${COLORS.grayLight};
  padding: 36px;
`;

const Content = styled.section`
  border-top: 8px solid ${COLORS.grayLight};
  padding-top: 36px;
`;

export default Layout;
