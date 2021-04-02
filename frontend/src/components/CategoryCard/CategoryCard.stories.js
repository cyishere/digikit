/* eslint-disable import/no-anonymous-default-export */
import styled from "styled-components/macro";
import CategoryCard from "./CategoryCard";

export default {
  title: "Client/CategoryCard",
  component: CategoryCard,
};

export const HomePage = () => (
  <Grid>
    <CategoryCard>Speaker</CategoryCard>
    <CategoryCard>Keyboard</CategoryCard>
    <CategoryCard>Headphone</CategoryCard>
  </Grid>
);

const Grid = styled.section`
  display: grid;
  grid-template-areas:
    "speaker keyboard"
    "speaker headphone";
  grid-template-columns: 1fr 2fr;
  grid-gap: 36px;
  height: 664px;
`;
