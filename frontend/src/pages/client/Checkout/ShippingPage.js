import Layout from "./Layout";
import { Form, Input, Label } from "../../../components/Form";
import Button from "../../../components/Button";

const ShippingPage = () => {
  return (
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
};

export default ShippingPage;
