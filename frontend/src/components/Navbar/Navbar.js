import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import Button from "../Button";
import { Cart } from "@styled-icons/ionicons-outline";

const Navbar = () => {
  return (
    <Wrapper>
      <Brand>
        <TextLink href="/">
          digi<TextEm>kit</TextEm>
        </TextLink>
      </Brand>
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

const Brand = styled.h1`
  font-family: Actor;
  font-size: 2.5rem;
`;

const TextLink = styled.a`
  color: ${COLORS.text};
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    color: ${COLORS.secondary};
    text-decoration: revert;
  }

  ${Brand} & {
    color: ${COLORS.primary};
    text-transform: none;

    &:hover {
      color: ${COLORS.text};
    }
  }
`;

const TextEm = styled.span`
  color: ${COLORS.text};
  text-transform: uppercase;

  &:hover {
    color: ${COLORS.primary};
  }
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
