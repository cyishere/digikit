import styled from "styled-components/macro";
import { COLORS } from "../../../styles/constants";
import formatCurrency from "../../../utils/formatCurrency";
import Layout from "./../Layout";
import CountGroup from "../../../components/CountGroup";
import Button from "../../../components/Button";

const product = {
  countInStock: 100,
  images: ["/assets/products/iqunix-f96.jpg"],
  title: "IQUNIX L80 Formula Typing Wireless Mechanical Keyboard",
  description:
    "80% Layout with 83 keys\n\n10% smaller than most 87-key mechanical keyboards.\nL80 improves design aesthetics while keeping the complete functionality of the keyboards.",
  price: 265,
  brand: "IQUNIX",
};

const ProductShow = () => {
  return (
    <Layout>
      <Wrapper>
        <Grid>
          <Img src={product.images[0]} alt={product.title} />
          <Content>
            <Title>{product.title}</Title>
            <Price>
              $<Em>{formatCurrency(product.price)}</Em>
            </Price>
            <Description>{product.description}</Description>
            <ProductCount>
              <CountGroup />
            </ProductCount>
            <Button variant="secondary">Add to Cart</Button>
          </Content>
        </Grid>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.main`
  background-color: ${COLORS.white};
  max-width: 1200px;
  margin: 48px auto;
`;

const Grid = styled.div`
  padding: 48px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 36px;
`;

const Img = styled.img`
  width: 100%;
  border: 2px solid ${COLORS.grayLightDim};
`;

const Content = styled.div`
  padding-top: 36px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 16px;
`;

const Price = styled.p`
  color: ${COLORS.textLight};
  margin-bottom: 32px;
`;

const Em = styled.em`
  color: ${COLORS.secondary};
`;

const Description = styled.div`
  line-height: 1.4;
  color: ${COLORS.textLight};
  margin-bottom: 32px;
`;

export const ProductCount = styled.div`
  margin-bottom: 16px;
`;

export default ProductShow;
