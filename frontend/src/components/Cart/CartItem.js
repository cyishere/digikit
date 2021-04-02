import { useDispatch } from "react-redux";
import { useQtyChange } from "../../utils/hooks";
import { removeFromCart, updateQty } from "../../slices/cartSlice";

import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import formatCurrency from "../../utils/formatCurrency";
import TextLink from "../TextLink";
import Button from "../Button";
import CountGroup from "../CountGroup";

const CartItem = ({ product, position }) => {
  const dispatch = useDispatch();

  const handleQtyChange = (newQty) => {
    dispatch(
      updateQty({
        productId: product.id,
        newQty: parseInt(newQty),
      })
    );
  };

  const { value: qty, handleIncrease, handleDecrease } = useQtyChange(
    product.qty,
    handleQtyChange
  );

  const deleteItemFromCart = (productInfo) => {
    dispatch(removeFromCart(productInfo));
  };

  let Wrapper;
  let controlContent;
  let title;

  if (position === "widget") {
    Wrapper = WrapperLite;

    controlContent = (
      <ControlLite>
        {qty} x ${formatCurrency(product.price)}
      </ControlLite>
    );

    title =
      product.title.length >= 13
        ? product.title.substring(0, 12) + "..."
        : product.title;
  } else if (position === "page") {
    Wrapper = WrapperFull;

    controlContent = (
      <ControlFull>
        <Button
          variant="danger"
          onClick={() =>
            deleteItemFromCart({
              id: product.id,
              price: product.price,
              qty,
            })
          }
        >
          Remove
        </Button>
        <Meta>
          <CountGroup
            countInStock={product.countInStock}
            qty={qty}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
          />
          <span>x</span>
          <span>
            $<Em>{formatCurrency(product.price)}</Em>
          </span>
        </Meta>
      </ControlFull>
    );

    title = product.title;
  } else {
    throw new Error("Invalid viewpoint");
  }

  return (
    <Wrapper>
      <Img src={product.images[0]} alt={product.title} />

      <Content>
        <Title>
          <TextLink to={`/products/${product.id}`}>{title}</TextLink>
        </Title>
        {controlContent}
      </Content>
    </Wrapper>
  );
};

const WrapperBase = styled.div`
  display: grid;
  border-bottom: 8px solid ${COLORS.grayLightDim};

  &:last-child {
    border-bottom: none;
  }

  &:first-child {
    padding-top: 0;
  }
`;

const WrapperFull = styled(WrapperBase)`
  grid-template-columns: 150px 1fr;
  grid-gap: 32px;
  padding: 32px 0;
`;

const WrapperLite = styled(WrapperBase)`
  grid-template-columns: 100px 1fr;
  grid-gap: 16px;
  padding: 16px 0;
`;

const Img = styled.img`
  width: 100%;
  border: 1px solid ${COLORS.primary};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const Title = styled.h4`
  font-size: 1.25rem;

  ${WrapperLite} & {
    font-size: 1rem;
  }
`;

const ControlFull = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  margin-left: -16px;
`;

const ControlLite = styled.div`
  display: block;
  width: 100%;
  text-align: right;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  color: ${COLORS.textLight};

  & > * {
    margin-left: 16px;
  }
`;

const Em = styled.em`
  color: ${COLORS.secondary};
`;

export default CartItem;
