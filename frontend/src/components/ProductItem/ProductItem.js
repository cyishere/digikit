import { useSelector } from "react-redux";
import { selectProductById } from "../../slices/productSlice";
import formatCurrency from "../../utils/formatCurrency";

import styled from "styled-components/macro";
import TextLink from "../TextLink";

const ProductItem = ({ productId, qty }) => {
  const product = useSelector((state) => selectProductById(state, productId));

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <Wrapper>
      <ImgContainer>
        <Img src={product.images[0]} alt={product.title} />
      </ImgContainer>
      <InfoContainer>
        <Title>
          <TextLink to={`/products/${productId}`}>{product.title}</TextLink>
        </Title>
        <Meta>
          {qty} x ${formatCurrency(product.price)}
        </Meta>
      </InfoContainer>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const ImgContainer = styled.div`
  width: 100px;
  margin-right: 16px;
`;

const Img = styled.img`
  width: 100%;
`;

const InfoContainer = styled.div`
  padding-top: 16px;
`;

const Title = styled.h4`
  margin-bottom: 32px;
`;

const Meta = styled.p``;

export default ProductItem;
