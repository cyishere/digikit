import styled from "styled-components/macro";
import AppLayout from "./Layout";

const Layout = ({ children }) => {
  return (
    <AppLayout>
      <Grid>{children}</Grid>
    </AppLayout>
  );
};

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 360px 1fr;
`;

export default Layout;
