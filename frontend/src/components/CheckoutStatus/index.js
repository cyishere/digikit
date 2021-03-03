import "./CheckoutStatus.scss";

const index = ({ status }) => {
  return (
    <nav className="checkout-status">
      <div
        className={`checkout-status__item ${status === "cart" ? "active" : ""}`}
      >
        <h4 className="title">Confirm Your Items</h4>
      </div>
      <div
        className={`checkout-status__item ${
          status === "shipping" ? "active" : ""
        }`}
      >
        <h4 className="title">Shipping Infomation</h4>
      </div>
      <div
        className={`checkout-status__item ${
          status === "payment" ? "active" : ""
        }`}
      >
        <h4 className="title">Payment</h4>
      </div>
    </nav>
  );
};

export default index;
