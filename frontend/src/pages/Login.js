import { useState } from "react";
import { Container, Form, Header } from "semantic-ui-react";

import { useFormChange } from "../utils/hooks";

const Login = () => {
  const [requestStatus, setRequestStatus] = useState("idle");
  const { values, handleChange } = useFormChange({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // success: redirect to home page
    // failed
  };

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
          <button type="submit" className="ui button secondary">
            Login
          </button>
        </Form>
      </Container>
    </main>
  );
};

export default Login;
