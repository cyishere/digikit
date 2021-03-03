/**
 * @param firstName
 * @param lastName
 * @param address "Street Address"
 * @param city
 * @param country
 * @param zipCode
 * @param phone "Phone Number"
 */

import CheckoutStatus from "../../components/CheckoutStatus";
import PageHeader from "../../components/PageHeader";

const ShippingPage = () => {
  return (
    <main className="main">
      <CheckoutStatus status="step2" />

      <PageHeader>Shipping Infomation</PageHeader>
    </main>
  );
};

export default ShippingPage;
