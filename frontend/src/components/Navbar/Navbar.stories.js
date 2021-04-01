/* eslint-disable import/no-anonymous-default-export */
// import { action } from "@storybook/addon-actions";
import Navbar from "./Navbar";

export default {
  title: "Client/Navbar",
  component: Navbar,
};

const loginUser = { userId: null };

export const NotLogin = () => <Navbar loginUser={loginUser.userId} />;

export const LoggedIn = () => <Navbar loginUser={(loginUser.userId = "1")} />;
