import styled from "styled-components/macro";
import Brand from "../Brand";
import { COLORS } from "../../styles/constants";

const Footer = ({ children }) => {
  return (
    <Wrapper>
      <FooterContainer>
        <Content>{children}</Content>
        <Brand />
      </FooterContainer>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  border-top: 8px solid ${COLORS.primary};
  background-color: ${COLORS.white};
`;

export const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 24px;
  padding-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & h1 {
    font-size: 2rem;
  }
`;

const Content = styled.p`
  color: ${COLORS.textLight};
`;

export default Footer;
