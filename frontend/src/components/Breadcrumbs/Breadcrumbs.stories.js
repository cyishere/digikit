/* eslint-disable import/no-anonymous-default-export */
import { Breadcrumbs, Crumb } from "./";
import TextLink from "../TextLink";

export default {
  title: "Client/Breadcrumbs",
  component: Breadcrumbs,
};

export const Default = () => (
  <Breadcrumbs>
    <Crumb>
      <TextLink to="/">Home</TextLink>
    </Crumb>
    <Crumb>
      <TextLink to="/checkout/cart">Checkout</TextLink>
    </Crumb>
    <Crumb>Shipping Info</Crumb>
  </Breadcrumbs>
);
