/* eslint-disable import/no-anonymous-default-export */
import Layout from "../../pages/client/Checkout/Layout";
import { CartItem } from "../Cart";
import { Form, Input, Label } from "../Form";
import Button from "../Button";
import Message from "../Message";

export default {
  title: "Client/Checkout",
  component: Layout,
};

const products = [
  {
    id: "1",
    title: "GMK Maestro",
    image: "http://localhost:3000/assets/products/gmk-maestro.jpg",
    price: "134.99",
    qty: 1,
  },
  {
    id: "2",
    title: "IQUNIX L80 Formula Typing Wireless Mechanical Keyboard",
    image: "http://localhost:3000/assets/products/iqunix-f96.jpg",
    price: "265",
    qty: 1,
  },

  {
    id: "3",
    title: "IQUNIX L80 Formula Typing Wireless Mechanical Keyboard",
    image: "http://localhost:3000/assets/products/iqunix-f96.jpg",
    price: "265",
    qty: 1,
  },
];

export const Cart = () => (
  <Layout step="cart">
    {products.map((product) => (
      <CartItem key={product.id} product={product} position="page" />
    ))}
  </Layout>
);

export const Shipping = () => (
  <Layout step="shipping">
    <Form>
      <Label htmlFor="firstName">First Name</Label>
      <Input
        type="text"
        id="firstName"
        name="firstName"
        placeholder="Please input your first name"
        required
      />

      <Label htmlFor="lastName">Last Name</Label>
      <Input
        type="text"
        id="lastName"
        name="lastName"
        placeholder="Please input your last name"
        required
      />

      <Label htmlFor="email">E-mail</Label>
      <Input
        type="text"
        id="email"
        name="email"
        placeholder="Please input your email"
        disabled
      />
      <Label htmlFor="address">Street Address</Label>
      <Input
        type="text"
        id="address"
        name="address"
        placeholder="Please input your address"
        required
      />
      <Label htmlFor="city">City</Label>
      <Input
        type="text"
        id="city"
        name="city"
        placeholder="Please input your city"
        required
      />

      <Label htmlFor="country">Country</Label>
      <Input
        type="text"
        id="country"
        name="country"
        placeholder="Please input your country"
        required
      />

      <Label htmlFor="zipCode">Zip Code</Label>
      <Input
        type="text"
        id="zipCode"
        name="zipCode"
        placeholder="Please input your zip code"
        required
      />

      <Label htmlFor="phone">Phone Number</Label>
      <Input
        type="text"
        id="phone"
        name="phone"
        placeholder="Please input your phone number"
        required
      />
      <Button variant="primary">Save</Button>
    </Form>
  </Layout>
);

export const Payment = () => (
  <Layout step="payment">
    <Message variant="info">
      <p>I haven’t implemented the payment method.</p>
      <p>This page only for demonstration.</p>
    </Message>
  </Layout>
);
