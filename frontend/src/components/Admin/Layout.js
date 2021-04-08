import { Link } from "react-router-dom";

import styled from "styled-components/macro";
import { COLORS, BREAKPOINTS } from "../../styles/constants";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Sidebar />
      <Main>
        <MainHeader>
          <Greeting>Hello, Debbie Ocean!</Greeting>
          <BackLink to="/">Back to home page</BackLink>
        </MainHeader>
        {children}
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 360px 1fr;
  background-color: ${COLORS.adminGrayLighter};
  color: ${COLORS.text};

  @media ${BREAKPOINTS.sm} {
    grid-template-columns: 1fr 2fr;
  }

  @media ${BREAKPOINTS.xs} {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  padding: 48px 32px;
`;

const MainHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;

  @media ${BREAKPOINTS.sm} {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Greeting = styled.p`
  font-size: 2rem;

  @media ${BREAKPOINTS.sm} {
    margin-bottom: 32px;
  }
`;

const BackLink = styled(Link)`
  color: ${COLORS.adminPrimary};
`;

export default Layout;
