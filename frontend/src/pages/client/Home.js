import styled from "styled-components/macro";
import Layout from "./Layout";
import { COLORS } from "../../styles/constants";

const Home = () => {
  return (
    <Layout>
      <Wrapper>
        <Container>
          <h1>Home Page</h1>
        </Container>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  background-color: ${COLORS.grayLight};
`;

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 36px 0;
`;

export default Home;
