import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";

// `assets/${category}.jpg`

const CategoryCard = ({ children }) => {
  const category = children.toLowerCase().trim();

  return (
    <Wrapper category={category} href={`/products?category=${category}`}>
      <Title>{children}</Title>
    </Wrapper>
  );
};

const Wrapper = styled.a`
  background-image: url(${(props) => `assets/${props.category}.jpg`});
  background-size: cover;
  position: relative;
  grid-area: ${(props) => props.category};
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: ${COLORS.secondary};
    opacity: 0.4;
  }
`;

const Title = styled.h2`
  padding-left: 24px;
  font-size: 2rem;
  text-transform: uppercase;
  position: absolute;
  bottom: 24px;
  color: ${COLORS.white};
`;

export default CategoryCard;
