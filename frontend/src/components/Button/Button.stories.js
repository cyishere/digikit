/* eslint-disable import/no-anonymous-default-export */
import { action } from "@storybook/addon-actions";
import Button from "./Button";

export default {
  title: "Component/Button",
  component: Button,
};

export const Text = () => <Button onClick={action("Clicked")}>signup</Button>;
