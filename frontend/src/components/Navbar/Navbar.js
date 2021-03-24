import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import Button from "../Button";
import Brand from "../Brand";
import TextLink from "../TextLink";
import { Cart } from "@styled-icons/ionicons-outline";

const Navbar = () => {
  return (
    <Wrapper>
      <Brand />
      <NavLinks>
        <NavItem>
          <TextLink href="/">products</TextLink>
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
          <TextLink href="/checkout/cart">
            <CartIcon size="36" />
          </TextLink>
        </NavItem>
      </NavLinks>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
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

const CartIcon = styled(Cart)`
  color: currentColor;
  opacity: 0.7;

  &:hover {
    color: ${COLORS.text};
    opacity: 1;
  }
`;

export default Navbar;
