import Layout from "./Layout";

const PaymentPage = (props) => {
  const path = props.location.pathname.split("/");

  return (
    <Layout path={path} pageTitle="Chose Your Payment">
      payment
    </Layout>
  );
};

export default PaymentPage;
