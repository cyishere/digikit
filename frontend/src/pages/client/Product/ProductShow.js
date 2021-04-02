import { useDispatch, useSelector } from "react-redux";
import { useQtyChange } from "../../../utils/hooks";
import { selectProductById } from "../../../slices/productSlice";
import { addToCart } from "../../../slices/cartSlice";

import styled from "styled-components/macro";
import { COLORS } from "../../../styles/constants";
import formatCurrency from "../../../utils/formatCurrency";
import Layout from "./../Layout";
import CountGroup from "../../../components/CountGroup";
import Button from "../../../components/Button";

const ProductShow = ({ match }) => {
  const { productId } = match.params;
  const product = useSelector((state) => selectProductById(state, productId));

  const { value: qty, handleIncrease, handleDecrease } = useQtyChange(1);

  const dispatch = useDispatch();

  const handleCheckout = ({ product, qty }) => {
    dispatch(addToCart({ product, qty: parseInt(qty) }));
  };

  if (!product) {
    return (
      <Layout>
        <Wrapper>
          <Info>Product not found.</Info>
        </Wrapper>
      </Layout>
    );
  }

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
            {product.countInStock > 0 ? (
              <>
                <ProductCount>
                  <CountGroup
                    countInStock={product.countInStock}
                    qty={qty}
                    handleIncrease={handleIncrease}
                    handleDecrease={handleDecrease}
                  />
                  <p>{product.countInStock} in stock.</p>
                </ProductCount>
                <Button
                  variant="secondary"
                  onClick={() => handleCheckout({ product, qty })}
                >
                  Add to Cart
                </Button>
              </>
            ) : (
              <Info>Out of stock.</Info>
            )}
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;

  & > * {
    margin-right: 16px;
  }
`;

const Info = styled.p`
  color: ${COLORS.textLight};
  padding: 16px;

  ${Content} & {
    padding: 0;
  }
`;

export default ProductShow;
