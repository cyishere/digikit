import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  selectAllCategories,
} from "../../slices/categorySlice";

import styled from "styled-components/macro";
import { COLORS, VIEWS, BREAKPOINTS } from "../../styles/constants";
import Layout from "./Layout";
import CategoryCard from "../../components/CategoryCard";
import Loader from "../../components/Loader";

const Home = () => {
  const categories = useSelector(selectAllCategories);
  const categoryStatus = useSelector((state) => state.category.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(getAllCategories());
    }
  }, [categoryStatus, dispatch]);

  if (categories.length === 0) return <Loader />;

  return (
    <Layout>
      <Wrapper>
        <Container>
          <Grid>
            {categories.map((category) => (
              <CategoryCard key={category.id}>{category.title}</CategoryCard>
            ))}
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
