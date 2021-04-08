import styled from "styled-components/macro";
import Layout from "./Layout";
import CategoryCard from "../../components/CategoryCard";
import { COLORS, VIEWS, BREAKPOINTS } from "../../styles/constants";

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
  max-width: ${VIEWS.lg};
  margin: 0 auto;
  padding: 32px 0;

  @media ${BREAKPOINTS.lg} {
    padding: 32px;
  }
`;

const Grid = styled.section`
  display: grid;
  grid-template-areas:
    "speaker keyboard"
    "speaker headphone";
  grid-template-columns: 1fr 2fr;
  grid-gap: 32px;
  height: 664px;

  @media ${BREAKPOINTS.sm} {
    grid-template-areas:
      "speaker"
      "keyboard"
      "headphone";
    grid-template-columns: 1fr;
  }
`;

export default Home;
