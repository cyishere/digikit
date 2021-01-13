import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Form, Header, Message } from "semantic-ui-react";

import { addNewUser } from "../features/user/userSlice";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    passconf: "",
  });
  const [requestStatus, setRequestStatus] = useState("idle");

  const errors = useSelector((state) => state.user.errors);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInfo({
      ...userInfo,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRequestStatus("loading");
    try {
      const result = await dispatch(addNewUser(userInfo));
      if (result.payload.hasOwnProperty("errors")) {
        setRequestStatus("failed");
      } else {
        setRequestStatus("success");
      }
    } catch (error) {
      setRequestStatus("failed");
      console.log("error in register frontend: ", error.message);
    }
  };

  return (
    <main>
      <Container text>
        <Header as="h2" textAlign="center">
          Register
        </Header>
        <Form
          loading={requestStatus === "loading"}
          success={requestStatus === "success"}
          error={requestStatus === "failed"}
          onSubmit={handleSubmit}
        >
          <Message success>
            <Message.Header>Register successfully!</Message.Header>
            <p>
              Please <Link to="/login">login</Link> to continue.
            </p>
          </Message>
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
              value={userInfo.username}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Please input your e-mail"
              value={userInfo.email}
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
              value={userInfo.password}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="passconf">Password Confirm</label>
            <input
              type="password"
              name="passconf"
              id="passconf"
              placeholder="Confirm your password"
              value={userInfo.passconf}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <button
            type="submit"
            className={
              requestStatus === "loading"
                ? "ui button secondary mt-10 loading"
                : "ui button secondary mt-10"
            }
          >
            Register
          </button>
        </Form>
      </Container>
    </main>
  );
};

export default Register;
