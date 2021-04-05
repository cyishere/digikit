/* eslint-disable import/no-anonymous-default-export */
import Layout from "./Layout";
import Dashboard from "./Dashboard";

export default {
  title: "Admin/Dashboard",
  component: Dashboard,
};

export const Default = () => (
  <Layout>
    <Dashboard />
  </Layout>
);
