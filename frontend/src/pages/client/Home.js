import styled from "styled-components/macro";
import Layout from "./Layout";
import CategoryCard from "../../components/CategoryCard";
import { COLORS } from "../../styles/constants";

const Home = () => {
  return (
    <Layout>
      <Wrapper>
        <Container>
          <Grid>
            <CategoryCard>Speaker</CategoryCard>
            <CategoryCard>Keyboard</CategoryCard>
            <CategoryCard>Headphone</CategoryCard>
          </Grid>
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

const Grid = styled.section`
  display: grid;
  grid-template-areas:
    "speaker keyboard"
    "speaker headphone";
  grid-template-columns: 1fr 2fr;
  grid-gap: 36px;
  height: 664px;
`;

export default Home;
