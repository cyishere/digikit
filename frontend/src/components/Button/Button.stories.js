/* eslint-disable import/no-anonymous-default-export */
import { action } from "@storybook/addon-actions";
import styled from "styled-components/macro";
import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
};

export const Default = () => (
  <Wrapper>
    <Button variant="default" onClick={action("Clicked")}>
      login
    </Button>
    <Button variant="default" href="/login">
      login
    </Button>
  </Wrapper>
);

export const Primary = () => (
  <Button variant="primary" onClick={action("Clicked")}>
    signup
  </Button>
);

export const Secondary = () => (
  <Button variant="secondary" onClick={action("Clicked")}>
    add to cart
  </Button>
);

const Wrapper = styled.div`
  & > * {
    margin-right: 16px;
  }
`;
