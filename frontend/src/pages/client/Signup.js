import { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { addNewUser } from "../../slices/userSlice";
import { useFormChange } from "../../utils/hooks";
import fetchStates from "../../utils/fetchStates";

import styled from "styled-components/macro";
import Layout from "./Layout";
import PageHeader from "../../components/PageHeader";
import { Form, Input, Label } from "../../components/Form";
import Button from "../../components/Button";
import Message from "../../components/Message";
import TextLink from "../../components/TextLink";

const Signup = () => {
  const { values, handleChange, resetValues } = useFormChange({
    name: "",
    email: "",
    password: "",
    passconf: "",
  });
  const [requestStatus, setRequestStatus] = useState(fetchStates.idle);
  const [requestMessage, setRequestMessage] = useState(null);

  const dispatch = useDispatch();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRequestStatus(fetchStates.fetching);
    try {
      const actionResult = await dispatch(addNewUser(values));
      const result = unwrapResult(actionResult);

      if (result.type === fetchStates.error) {
        setRequestStatus(fetchStates.error);
        setRequestMessage(result.message);
      } else {
        setRequestStatus(fetchStates.success);
        resetValues();
      }
    } catch (error) {
      setRequestStatus(fetchStates.error);
      setRequestMessage(error.message);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <PageHeader>Signup</PageHeader>
        <Form onSubmit={handleRegisterSubmit}>
          {requestStatus === fetchStates.error && (
            <Message variant="danger">{requestMessage}</Message>
          )}
          {requestStatus === fetchStates.success && (
            <Message variant="success">
              Register successfully! Please{" "}
              <TextLink to="/login">login</TextLink>.
            </Message>
          )}
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Please write your name here"
          />
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Please write your e-mail here"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Please write your password here"
          />
          <Label htmlFor="passconf">Confirm Password</Label>
          <Input
            type="password"
            id="passconf"
            name="passconf"
            value={values.passconf}
            onChange={handleChange}
            placeholder="Please confirm your password"
          />

          <Button
            variant="primary"
            type="submit"
            disabled={requestStatus === fetchStates.fetching}
          >
            Signup
          </Button>
        </Form>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.main`
  padding-top: 48px;
  padding-bottom: 48px;
`;

export default Signup;
