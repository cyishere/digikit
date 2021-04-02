/* eslint-disable import/no-anonymous-default-export */
import Form from "./Form";
import Label from "./Label";
import Input from "./Input";
import Button from "../Button";
import PageHeader from "../PageHeader";

export default {
  title: "Client/Form",
  component: Form,
  subcomponent: { Label, Input },
};

export const Signup = () => (
  <div>
    <PageHeader>Signup</PageHeader>
    <Form>
      <Label htmlFor="name">Name</Label>
      <Input type="text" id="name" placeholder="Please write your name here" />
      <Label htmlFor="email">E-mail</Label>
      <Input
        type="email"
        id="email"
        placeholder="Please write your e-mail here"
      />
      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        id="password"
        placeholder="Please write your password here"
      />
      <Label htmlFor="passconf">Confirm Password</Label>
      <Input
        type="password"
        id="passconf"
        placeholder="Please confirm your password"
      />

      <Button variant="primary">Signup</Button>
    </Form>
  </div>
);

export const Login = () => (
  <div>
    <PageHeader>Login</PageHeader>
    <Form>
      <Label htmlFor="email">E-mail</Label>
      <Input
        type="email"
        id="email"
        placeholder="Please write your e-mail here"
      />
      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        id="password"
        placeholder="Please write your password here"
      />
      <Label htmlFor="passconf">Confirm Password</Label>
      <Input
        type="password"
        id="passconf"
        placeholder="Please confirm your password"
      />

      <Button variant="primary">Login</Button>
    </Form>
  </div>
);
