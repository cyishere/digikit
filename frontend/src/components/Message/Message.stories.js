/* eslint-disable import/no-anonymous-default-export */
import Message from "./";

export default {
  title: "Client/Message",
  component: Message,
};

export const Default = () => (
  <Message variant="info">
    <p>I haven’t implemented the payment method.</p>
    <p>This page only for demonstration.</p>
  </Message>
);

export const Error = () => (
  <Message variant="danger">This e-mail is taken.</Message>
);
