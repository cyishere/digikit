import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useFormChange } from "../../utils/hooks";
import fetchStates from "../../utils/fetchStates";
import { userLogin } from "../../slices/userSlice";

import styled from "styled-components/macro";
import Layout from "./Layout";
import PageHeader from "../../components/PageHeader";
import { Form, Input, Label } from "../../components/Form";
import Button from "../../components/Button";
import Message from "../../components/Message";

const Login = () => {
  const { values, handleChange, resetValues } = useFormChange({
    email: "",
    password: "",
  });
  const [requestStatus, setRequestStatus] = useState(fetchStates.idle);
  const [requestMessage, setRequestMessage] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const actionResult = await dispatch(userLogin(values));
      const result = unwrapResult(actionResult);

      if (result.type === fetchStates.error) {
        setRequestStatus(fetchStates.error);
        setRequestMessage(result.message);
      } else {
        // 1. set localStorage
        localStorage.setItem("digiUser", JSON.stringify(result));
        // 2. reset form values
        resetValues();
        // 3. redirect to home page
        history.push("/");
      }
    } catch (error) {
      setRequestStatus(fetchStates.error);
      setRequestMessage(error.message);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <PageHeader>Login</PageHeader>
        <Form onSubmit={handleLoginSubmit}>
          {requestStatus === fetchStates.error && (
            <Message variant="danger">{requestMessage}</Message>
          )}

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

          <Button
            variant="primary"
            type="submit"
            disabled={requestStatus === fetchStates.fetching}
          >
            Login
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

export default Login;
