import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import formatCurrency from "../../utils/formatCurrency";
import TextLink from "../TextLink";
import Button from "../Button";
import CountGroup from "../CountGroup";
import { Wrapper as WidgetWrapper } from "./CartWidget";

const CartItem = ({ product, position }) => {
  let controlContent;
  let title;

  if (position === "widget") {
    controlContent = (
      <ControlLite>
        {product.qty} x ${formatCurrency(product.price)}
      </ControlLite>
    );

    title =
      product.title.length >= 13
        ? product.title.substring(0, 12) + "..."
        : product.title;
  } else if (position === "page") {
    controlContent = (
      <ControlFull>
        <Button variant="danger">Remove</Button>
        <Meta>
          <CountGroup />
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
      <Img src={product.image} alt={product.title} />

      <Content>
        <Title>
          <TextLink>{title}</TextLink>
        </Title>
        {controlContent}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-gap: 32px;
  border-bottom: 8px solid ${COLORS.grayLightDim};
  padding: 32px 0;

  ${WidgetWrapper} & {
    grid-template-columns: 100px 1fr;
    grid-gap: 16px;
    padding: 16px 0;

    &:last-child {
      border-bottom: none;
    }
  }
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

  ${WidgetWrapper} & {
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
