import styled from "styled-components/macro";
import Brand from "../Brand";
import { COLORS } from "../../styles/constants";

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <Content>
          A mock website made with <Emoji>☕</Emoji> by{" "}
          <a href="https://cyishere.dev">CY</a>.
        </Content>
        <Brand />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  border-top: 8px solid ${COLORS.primary};
  background-color: ${COLORS.white};
`;

const Container = styled.div`
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

  & a {
    color: ${COLORS.secondary};

    &:hover {
      color: ${COLORS.text};
    }
  }
`;

const Emoji = styled.span``;
export default Footer;
