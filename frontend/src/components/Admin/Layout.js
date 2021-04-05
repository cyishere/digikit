import { Link } from "react-router-dom";

import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
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
  display: grid;
  grid-template-columns: 360px 1fr;
  background-color: ${COLORS.adminGrayLighter};
  color: ${COLORS.text};
`;

const Main = styled.main`
  padding: 48px 32px;
`;

const MainHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
`;

const Greeting = styled.p`
  font-size: 2rem;
`;

const BackLink = styled(Link)`
  color: ${COLORS.adminPrimary};
`;

export default Layout;
