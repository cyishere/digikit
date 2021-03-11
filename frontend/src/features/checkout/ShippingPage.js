/**
 * @param firstName
 * @param lastName
 * @param address "Street Address"
 * @param city
 * @param country
 * @param zipCode
 * @param phone "Phone Number"
 */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, updateUserInfo } from "../../slices/userSlice";
import { useFormChange } from "../../utils/hooks";
import fetchStates from "../../utils/fetchStates";
import Layout from "./Layout";
import Message from "../../components/Message";
import "../../styles/grid.scss";
import "../../styles/form.scss";
import "./Checkout.scss";

const ShippingPage = (props) => {
  const path = props.location.pathname.split("/");

  // if the user login, show the basic info
  const { userId, token } = useSelector((state) => state.user.loginUser);
  const userInfo = useSelector((state) => state.user.info);
  const message = useSelector((state) => state.user.message);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    phone: "",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUserInfo({ userId, token }));
    }
  }, [token, userId, dispatch]);

  const { values, handleChange, resetValues } = useFormChange({
    ...initialValues,
    ...userInfo,
  });
  const [requestStatus, setRequestStatus] = useState(fetchStates.idle);

  // TODO
  // if not login, please login

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      updateUserInfo({ userId, token, userInfo: values })
    );

    if (result.payload.type === "error") {
      setRequestStatus(fetchStates.error);
    } else {
      setRequestStatus(fetchStates.success);
      resetValues();
    }
  };

  return (
    <Layout
      path={path}
      pageTitle="Shipping Infomation"
      proceedText="Proceed to Billing"
    >
      {(requestStatus === fetchStates.error ||
        requestStatus === fetchStates.success) && (
        <Message msgContent={message} msgStatus={requestStatus} />
      )}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
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
            name="lastName"
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
            id="email"
            name="email"
            placeholder="Please input your email"
            value={values.email}
            disabled
          />
        </div>

        <div className="form-control">
          <label htmlFor="address">Street Address</label>
          <input
            type="text"
            id="address"
            name="address"
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
            name="city"
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
            name="country"
            placeholder="Please input your country"
            value={values.country}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            placeholder="Please input your zip code"
            value={values.zipCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Please input your phone number"
            value={values.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button className="button button-primary" type="submit">
            Proceed to Billing
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default ShippingPage;
