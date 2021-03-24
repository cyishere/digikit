/* eslint-disable import/no-anonymous-default-export */
import Layout from "./Layout";
import Home from "./Home";

export default {
  title: "Dashboard/Dashboard",
  component: Home,
};

export const Default = () => (
  <Layout>
    <main>
      <h2>Dashboard</h2>
    </main>
  </Layout>
);
