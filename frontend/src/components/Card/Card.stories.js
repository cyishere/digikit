/* eslint-disable import/no-anonymous-default-export */
import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import Card from "./Card";

export default {
  title: "Client/Card",
  component: Card,
};

export const Default = () => (
  <Wrapper>
    <Card
      id="1"
      title="GMK Maestro"
      image="http://localhost:3000/assets/products/gmk-maestro.jpg"
      price="134.99"
    />
    <Card
      id="2"
      title="IQUNIX L80 Formula Typing Wireless Mechanical Keyboard"
      image="http://localhost:3000/assets/products/iqunix-f96.jpg"
      price="265"
    />
  </Wrapper>
);

const Wrapper = styled.div`
  background-color: ${COLORS.white};
  padding: 36px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 36px;
`;
