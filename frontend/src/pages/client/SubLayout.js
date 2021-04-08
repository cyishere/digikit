import styled from "styled-components/macro";
import { BREAKPOINTS, VIEWS } from "../../styles/constants";
import AppLayout from "./Layout";

const Layout = ({ children }) => {
  return (
    <AppLayout>
      <Grid>{children}</Grid>
    </AppLayout>
  );
};

const Grid = styled.div`
  max-width: ${VIEWS.lg};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 360px 1fr;

  @media ${BREAKPOINTS.md} {
    grid-template-columns: 1fr 2fr;
  }

  @media ${BREAKPOINTS.xs} {
    grid-template-columns: 1fr;
  }
`;

export default Layout;
