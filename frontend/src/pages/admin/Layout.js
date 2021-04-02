import styled from "styled-components";
import { COLORS } from "../../styles/constants";
import DashHeader from "../../components/DashHeader";
import Footer from "../../components/Footer";
import TextLink from "../../components/TextLink";

const Layout = ({ children }) => {
  return (
    <div>
      <DashWrapper>
        <DashHeader />
        {children}
        <Footer>
          A mock website made with <Emoji>☕</Emoji> by{" "}
          <TextLink href="https://cyishere.dev">CY</TextLink>.
        </Footer>
      </DashWrapper>
    </div>
  );
};

export const DashWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: ${COLORS.white};
`;

const Emoji = styled.span``;

export default Layout;
