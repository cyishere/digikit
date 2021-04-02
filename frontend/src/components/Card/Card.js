import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import { Link } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";

const Card = ({ title, image, price, id }) => {
  return (
    <Wrapper as={Link} to={`/products/${id}`}>
      <Img src={image} alt={title} />
      <Content>
        <Title>{title}</Title>
        <Price>
          $<Em>{formatCurrency(price)}</Em>
        </Price>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${COLORS.grayLight};
  border: 2px solid ${COLORS.grayLight};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${COLORS.primary};
    transform: scale(1.01);
  }
`;

const Img = styled.img`
  width: 100%;
`;

const Content = styled.div`
  padding: 16px;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  line-height: 1.4;
  margin-bottom: 24px;
  color: ${COLORS.text};
`;

const Price = styled.p`
  color: ${COLORS.textLight};
`;

const Em = styled.em`
  font-style: normal;
  color: ${COLORS.secondary};
`;

export default Card;
