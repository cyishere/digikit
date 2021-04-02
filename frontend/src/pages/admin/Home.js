import styled from "styled-components/macro";
import Layout from "./Layout";

const Home = () => {
  return (
    <Layout>
      <Container>
        <h2>Dashboard</h2>
      </Container>
    </Layout>
  );
};

const Container = styled.main`
  padding: 48px;
`;

export default Home;
