import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserInfo, updateUserInfo } from "../../slices/userSlice";
import fetchStates from "../../utils/fetchStates";
import Layout from "./Layout";
import Message from "../../components/Message";
import CartSidebarLayout from "../../components/Cart/CartSidebarLayout";
import Button from "../../components/Button";
import "../../styles/grid.scss";
import "../../styles/form.scss";
import "./Checkout.scss";

const ShippingPage = (props) => {
  const path = props.location.pathname.split("/");

  // if the user login, show the basic info
  const { userId, token } = useSelector((state) => state.user.loginUser);
  const userInfo = useSelector((state) => state.user.info);
  const message = useSelector((state) => state.user.message);
  const [values, setValues] = useState({});
  const [requestStatus, setRequestStatus] = useState(fetchStates.idle);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (token) {
      dispatch(getUserInfo({ userId, token }));
    }
  }, [token, dispatch, userId]);

  useEffect(() => {
    setValues(userInfo);
  }, [userInfo]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // TODO
  // if not login, please login

  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      const result = await dispatch(
        updateUserInfo({ userId, token, userInfo: values })
      );

      if (result.payload.type === "error") {
        setRequestStatus(fetchStates.error);
      } else {
        // setRequestStatus(fetchStates.success);
        history.push("/checkout/payment");
      }
    } catch (error) {
      setRequestStatus(fetchStates.error);
    }
  };

  return (
    <Layout path={path} pageTitle="Shipping Infomation">
      <div className="checkout-page__body">
        {requestStatus === fetchStates.error && (
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
              value={userInfo.email}
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
        </form>
      </div>

      <CartSidebarLayout>
        <Button styleStatus="primary" onClickHandler={handleSubmit}>
          Proceed to Billing
        </Button>
      </CartSidebarLayout>
    </Layout>
  );
};

export default ShippingPage;
