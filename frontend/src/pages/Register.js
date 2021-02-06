import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addNewUser } from "../features/user/userSlice";

import "../styles/form.scss";
import "../styles/button.scss";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    passconf: "",
  });
  const [requestStatus, setRequestStatus] = useState("idle");

  // const errors = useSelector((state) => state.user.errors);

  // const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInfo({
      ...userInfo,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setRequestStatus("loading");
    // try {
    //   const result = await dispatch(addNewUser(userInfo));
    //   if (result.payload.hasOwnProperty("errors")) {
    //     setRequestStatus("failed");
    //   } else {
    //     setRequestStatus("success");
    //   }
    // } catch (error) {
    //   setRequestStatus("failed");
    //   console.log("error in register frontend: ", error.message);
    // }
  };

  return (
    <main className="ms-page">
      <header className="page-header">
        <h2 className="page-header__title">Register</h2>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-control">
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
        </div>

        <div className="form-control">
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
        </div>

        <div className="form-control">
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
        </div>

        <div className="form-control">
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
        </div>

        <div className="form-actions">
          <button className="button button-primary" type="submit">
            Register
          </button>
        </div>
      </form>
    </main>
  );
};

export default Register;
