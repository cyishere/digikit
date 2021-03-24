/* eslint-disable import/no-anonymous-default-export */
import { action } from "@storybook/addon-actions";
import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
};

export const Default = () => (
  <Button variant="default" onClick={action("Clicked")}>
    login
  </Button>
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
