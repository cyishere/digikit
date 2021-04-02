import GlobalStyles from "../src/styles/GlobalStyles";
import { addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

addDecorator((story) => (
  <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
));

export const decorators = [
  (Story) => (
    <>
      <GlobalStyles />
      <Story />
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
