import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import Button from "../Button";
import Brand from "../Brand";
import TextLink from "../TextLink";
import CartSpot from "../Cart/CartSpot";

const Navbar = () => {
  return (
    <Wrapper>
      <Container>
        <Brand />
        <NavLinks>
          <NavItem>
            <TextLink href="/products">products</TextLink>
          </NavItem>
          <NavItem>
            <TextLink href="/orders">orders</TextLink>
          </NavItem>
          <NavItem>
            <Button variant="default" href="/login">
              login
            </Button>
          </NavItem>
          <NavItem>
            <Button variant="primary" href="/register">
              signup
            </Button>
          </NavItem>
          <NavItem>
            <CartSpot />
          </NavItem>
        </NavLinks>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background-color: ${COLORS.white};
`;

const Container = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 32px;
  padding-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const NavItem = styled.li`
  margin-left: 24px;
`;

export default Navbar;
