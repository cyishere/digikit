import Layout from "./Layout";
import Message from "../../components/Message";

const PaymentPage = (props) => {
  const path = props.location.pathname.split("/");

  return (
    <Layout
      path={path}
      pageTitle="Chose Your Payment"
      proceedText="Proceed to Pay"
    >
      <Message
        msgStatus="warning"
        msgContent="Sorry, I don't have any payment method to demonstrate this process."
      />
    </Layout>
  );
};

export default PaymentPage;
