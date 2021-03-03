/**
 * @param firstName
 * @param lastName
 * @param address "Street Address"
 * @param city
 * @param country
 * @param zipCode
 * @param phone "Phone Number"
 */

import { useFormChange } from "../../utils/hooks";
import Layout from "./Layout";
import Button from "../../components/Button";
import "../../styles/grid.scss";
import "../../styles/form.scss";
import "./Checkout.scss";

const ShippingPage = (props) => {
  const path = props.location.pathname.split("/");

  const { values, handleChange, resetValues } = useFormChange({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    phone: "",
  });

  return (
    <Layout
      path={path}
      pageTitle="Shipping Infomation"
      proceedText="Proceed to Billing"
    >
      <form className="form">
        <div className="form-control">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Please input your first name"
            value={values.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Please input your last name"
            value={values.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Please input your email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="address">Street Address</label>
          <input
            type="text"
            id="address"
            placeholder="Please input your address"
            value={values.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Please input your city"
            value={values.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Please input your country"
            value={values.country}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="zip">Zip Code</label>
          <input
            type="text"
            id="zip"
            placeholder="Please input your zip code"
            value={values.zip}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            placeholder="Please input your phone number"
            value={values.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <Button styleStatus="primary">Proceed to Billing</Button>
        </div>
      </form>
    </Layout>
  );
};

export default ShippingPage;
