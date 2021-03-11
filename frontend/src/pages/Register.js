import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Message from "../components/Message";
import { useFormChange } from "../utils/hooks";
import { addNewUser } from "../slices/userSlice";
import fetchStates from "../utils/fetchStates";

import "../styles/form.scss";
import "../styles/button.scss";

const Register = () => {
  const [requestStatus, setRequestStatus] = useState(fetchStates.idle);
  const [message, setMessage] = useState(null);

  const { values, handleChange, resetValues } = useFormChange({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passconf: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRequestStatus(fetchStates.fetching);
    try {
      const result = await dispatch(addNewUser(values));

      if (result.payload.type === "error") {
        setRequestStatus(fetchStates.error);
        setMessage(result.payload.message);
      } else {
        setRequestStatus(fetchStates.success);
        setMessage(
          <p>
            Successfully registered! Please go to{" "}
            <Link to="/login">login page</Link>.
          </p>
        );
        resetValues();
      }
    } catch (error) {
      setRequestStatus(fetchStates.error);
    }
  };

  return (
    <main className="ms-page">
      <header className="page-header">
        <h2 className="page-header__title">Register</h2>
      </header>

      {(requestStatus === fetchStates.error ||
        requestStatus === fetchStates.success) && (
        <Message msgContent={message} msgStatus={requestStatus} />
      )}

      <form className="form" onSubmit={handleSubmit}>
        <div className="grid grid-1-1">
          <div className="form-control">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
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
              name="lastName"
              id="lastName"
              placeholder="Please input your last name"
              value={values.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Please input your e-mail"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
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
        </div>

        <div className="form-control">
          <label htmlFor="passconf">Password Confirm</label>
          <input
            type="password"
            name="passconf"
            id="passconf"
            placeholder="Confirm your password"
            value={values.passconf}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button
            className="button button-primary"
            type="submit"
            disabled={requestStatus === fetchStates.fetching}
          >
            Register
          </button>
        </div>
      </form>
    </main>
  );
};

export default Register;
