import Layout from "./Layout";
import Message from "../../../components/Message";

const PaymentPage = () => {
  return (
    <Layout step="payment">
      <Message variant="info">
        <p>I haven’t implemented the payment method.</p>
        <p>This page only for demonstration.</p>
      </Message>
    </Layout>
  );
};

export default PaymentPage;
