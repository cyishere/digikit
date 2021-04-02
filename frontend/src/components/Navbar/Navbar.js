import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../slices/userSlice";

import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import Brand from "../Brand";
import CartSpot from "../Cart/CartSpot";

const Navbar = () => {
  const loginUser = useSelector((state) => state.user.loginUser);

  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logoutUser());
  };

  const navContent =
    loginUser.userId !== null ? (
      <>
        <NavItem>
          <TextLink to="/orders">orders</TextLink>
        </NavItem>
        <NavItem>
          <Button variant="default" onClick={handleLogoutClick}>
            Logout
          </Button>
        </NavItem>
      </>
    ) : (
      <>
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
      </>
    );

  return (
    <Wrapper>
      <Container>
        <Brand />
        <NavLinks>
          <NavItem>
            <TextLink to="/products">products</TextLink>
          </NavItem>
          {navContent}
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

const TextLink = styled(NavLink)`
  color: ${COLORS.text};
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    color: ${COLORS.secondary};
    text-decoration: revert;
  }

  &.active {
    color: ${COLORS.secondary};
    font-weight: 500;
  }
`;

export default Navbar;
