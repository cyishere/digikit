import { SubLayout as Layout } from "../../../components/Admin";
import TextLink from "../../../components/TextLink";

const OrderDetails = () => {
  return (
    <Layout pageTitle="Order Details">
      <TextLink to="/admin/orders">&larr; Back to order list</TextLink>
    </Layout>
  );
};

export default OrderDetails;
