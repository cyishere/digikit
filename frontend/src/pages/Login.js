import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Header, Message } from "semantic-ui-react";

import { useFormChange } from "../utils/hooks";
import { userLogin } from "../features/user/userSlice";

const Login = () => {
  const [requestStatus, setRequestStatus] = useState("idle");
  const { values, handleChange } = useFormChange({
    username: "",
    password: "",
  });

  const loginUser = useSelector((state) => state.user.loginUser);
  const errors = useSelector((state) => state.user.errors);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const returnedLoginInfo = await dispatch(userLogin(values));

      // failed
      if (returnedLoginInfo.payload.hasOwnProperty("errors")) {
        setRequestStatus("failed");
      } else {
        localStorage.setItem(
          "funcars_user",
          JSON.stringify(returnedLoginInfo.payload)
        );
      }
    } catch (error) {
      setRequestStatus("failed");
      console.log("error in login page: ", error);
    }
  };

  if (loginUser) {
    return (
      <Message>
        <Message.Header>
          {loginUser.username} has already logged in.
        </Message.Header>
        <p>
          Go to <Link to="/">home page</Link>.
        </p>
      </Message>
    );
  }

  return (
    <main>
      <Container text>
        <Header as="h2" textAlign="center">
          Login
        </Header>
        <Form
          onSubmit={handleSubmit}
          loading={requestStatus === "loading"}
          error={requestStatus === "failed"}
        >
          <Message error>
            <ul>
              {Object.values(errors).map((value, i) => (
                <li key={i}>{value}</li>
              ))}
            </ul>
          </Message>

          <Form.Field>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Please input your username"
              value={values.username}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Please input your password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <button
            type="submit"
            className={
              requestStatus === "loading"
                ? "ui button secondary loading"
                : "ui button secondary"
            }
          >
            Login
          </button>
        </Form>
      </Container>
    </main>
  );
};

export default Login;
