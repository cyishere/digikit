/* eslint-disable import/no-anonymous-default-export */
import { action } from "@storybook/addon-actions";
import styled from "styled-components/macro";
import Button from "./Button";

export default {
  title: "Client/Button",
  component: Button,
};

export const Default = () => (
  <Wrapper>
    <Button variant="default" onClick={action("Clicked")}>
      button
    </Button>
    <Button variant="default" href="/login">
      link
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

export const Disabled = () => (
  <Button variant="primary" onClick={action("Clicked")} disabled>
    add to cart
  </Button>
);

const Wrapper = styled.div`
  & > * {
    margin-right: 16px;
  }
`;
