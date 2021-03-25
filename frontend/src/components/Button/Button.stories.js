/* eslint-disable import/no-anonymous-default-export */
import { action } from "@storybook/addon-actions";
import { Link, Router } from "react-router-dom";
import styled from "styled-components/macro";
import Button from "./Button";

export default {
  title: "Client/Button",
  component: Button,
};

export const Default = () => (
  <Wrapper>
    <Router>
      <Button variant="default" onClick={action("Clicked")}>
        login
      </Button>
      <Button variant="default" href="/login">
        login
      </Button>
      {/* <Button variant="default" as={Link} to="/admin">
        link
      </Button> */}
      <Link to="/">Example</Link>
    </Router>
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
