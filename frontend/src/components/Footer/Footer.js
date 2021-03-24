import styled from "styled-components/macro";
import TextLink from "../TextLink";
import Brand from "../Brand";
import { COLORS } from "../../styles/constants";

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <Content>
          A mock website made with <Emoji>☕</Emoji> by{" "}
          <TextLink href="https://cyishere.dev">CY</TextLink>.
        </Content>
        <Brand />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  border-top: 8px solid ${COLORS.primary};
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 24px;
  padding-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.p`
  color: ${COLORS.textLight};
`;

const Emoji = styled.span``;

export default Footer;
