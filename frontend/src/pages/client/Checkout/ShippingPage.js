import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { addPrevLocation } from "../../../slices/locationSlice";
import { useFormChange } from "../../../utils/hooks";
import { updateUserInfo } from "../../../slices/userSlice";
import fetchStates from "../../../utils/fetchStates";

import Layout from "./Layout";
import { Form, Input, Label } from "../../../components/Form";
import Button from "../../../components/Button";
import TextLink from "../../../components/TextLink";
import Message from "../../../components/Message";

const ShippingPage = () => {
  const [requestState, setRequestState] = useState(fetchStates.idle);
  const [message, setMessage] = useState(null);
  const { loginUser, info } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { values, handleChange, changed } = useFormChange(info);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const actionResult = await dispatch(
        updateUserInfo({ ...loginUser, userInfo: values })
      );
      const result = unwrapResult(actionResult);

      if (result.type === fetchStates.error) {
        setRequestState(fetchStates.error);
        setMessage(result.message);
      } else {
        setRequestState(fetchStates.success);
        setMessage("Information updated!");
      }
    } catch (error) {
      setRequestState(fetchStates.error);
      setMessage(error.message);
    }
  };

  let pageContent;

  if (!loginUser.userId) {
    dispatch(addPrevLocation("/checkout/shipping"));

    pageContent = (
      <p>
        Please <TextLink to="/login">login</TextLink> or{" "}
        <TextLink to="/register">register</TextLink>
      </p>
    );
  } else {
    pageContent = (
      <Form onSubmit={handleUpdateSubmit}>
        {requestState === fetchStates.error && (
          <Message variant="danger">{message}</Message>
        )}
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Please input your name"
          required
        />

        <Label htmlFor="email">E-mail</Label>
        <Input
          type="text"
          id="email"
          name="email"
          value={values.email}
          readOnly
          disabled
        />
        <Label htmlFor="address">Street Address</Label>
        <Input
          type="text"
          id="address"
          name="address"
          value={values.address}
          onChange={handleChange}
          placeholder="Please input your address"
          required
        />
        <Label htmlFor="city">City</Label>
        <Input
          type="text"
          id="city"
          name="city"
          value={values.city}
          onChange={handleChange}
          placeholder="Please input your city"
          required
        />

        <Label htmlFor="country">Country</Label>
        <Input
          type="text"
          id="country"
          name="country"
          value={values.country}
          onChange={handleChange}
          placeholder="Please input your country"
          required
        />

        <Label htmlFor="zipCode">Zip Code</Label>
        <Input
          type="text"
          id="zipCode"
          name="zipCode"
          value={values.zipCode}
          onChange={handleChange}
          placeholder="Please input your zip code"
          required
        />

        <Label htmlFor="phone">Phone Number</Label>
        <Input
          type="number"
          id="phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          placeholder="Please input your phone number"
          required
        />
        <Button variant="primary" type="submit" disabled={!changed}>
          Save
        </Button>
        {requestState === fetchStates.success && (
          <Message variant="success" style={{ marginTop: "16" }}>
            {message}
          </Message>
        )}
      </Form>
    );
  }
  return <Layout step="shipping">{pageContent}</Layout>;
};

export default ShippingPage;
