import { useState } from "react";
import { useDispatch } from "react-redux";
import Message from "../components/Message/Message";
import { useFormChange } from "../utils/hooks";
import { userLogin } from "../features/user/userSlice";
import fetchStates from "../utils/fetchStates";

import "../styles/form.scss";
import "../styles/button.scss";

const Login = () => {
  const [requestStatus, setRequestStatus] = useState(fetchStates.idle);
  const [message, setMessage] = useState(null);

  const { values, handleChange } = useFormChange({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(userLogin(values));

      if (result.payload.type === "error") {
        setRequestStatus(fetchStates.error);
        setMessage(result.payload.message);
      } else {
        localStorage.setItem("digiUser", JSON.stringify(result.payload));
      }
    } catch (error) {
      console.log(error);
      setRequestStatus(fetchStates.error);
    }
  };

  return (
    <main className="ms-page">
      <header className="page-header">
        <h2 className="page-header__title">Login</h2>
      </header>

      {requestStatus === fetchStates.error && (
        <Message msgContent={message} msgStatus={requestStatus} />
      )}

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Please input your email"
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
        <div className="form-actions">
          <button
            className="button button-primary"
            type="submit"
            disabled={requestStatus === fetchStates.fetching}
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
};

export default Login;
