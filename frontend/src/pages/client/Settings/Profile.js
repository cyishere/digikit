import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useFormChange } from "../../../utils/hooks";
import { updateUserInfo } from "../../../slices/userSlice";
import fetchStates from "../../../utils/fetchStates";

import styled from "styled-components/macro";
import { COLORS } from "../../../styles/constants";
import SubLayout from "../SubLayout";
import SideMenu from "./SideMenu";
import PageHeader from "../../../components/PageHeader";
import { Form, Label, Input } from "../../../components/Form";
import Button from "../../../components/Button";
import Message from "../../../components/Message";

const Profile = ({ location }) => {
  const { loginUser, info } = useSelector((state) => state.user);
  const { values, handleChange, changed } = useFormChange(info);
  const [requestState, setRequestState] = useState(fetchStates.idle);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

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

  return (
    <SubLayout>
      <SideMenu location={location} />
      <MainContainer>
        <PageHeader>User Profile</PageHeader>

        {requestState === fetchStates.error && (
          <Message variant="danger">{message}</Message>
        )}

        <Form onSubmit={handleUpdateSubmit}>
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
        </Form>
        {requestState === fetchStates.success && (
          <Message variant="success" style={{ marginTop: "16" }}>
            {message}
          </Message>
        )}
      </MainContainer>
    </SubLayout>
  );
};

const MainContainer = styled.main`
  background-color: ${COLORS.white};
  border-top: 8px solid ${COLORS.grayLight};
  padding: 36px;
`;

export default Profile;
