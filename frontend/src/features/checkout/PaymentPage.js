import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createOrder } from "../../slices/orderSlice";
import { clearCart } from "../../slices/cartSlice";
import fetchStates from "../../utils/fetchStates";
import Layout from "./Layout";
import CartSidebarLayout from "../../components/Cart/CartSidebarLayout";
import Message from "../../components/Message";
import Button from "../../components/Button";

const PaymentPage = (props) => {
  const path = props.location.pathname.split("/");
  const { token } = useSelector((state) => state.user.loginUser);
  const { products, total } = useSelector((state) => state.cart);
  const message = useSelector((state) => state.order.message);
  const [requestStatus, setRequestStatus] = useState(fetchStates.idle);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleConfirmOrder = async () => {
    const productInfos = products.map((product) => ({
      id: product.id,
      qty: product.qty,
    }));
    const orderInfo = { products: productInfos, value: +total };
    try {
      // console.log({ products: productInfos, value: +total, token });
      const result = await dispatch(createOrder({ orderInfo, token }));
      if (result.payload.type === "error") {
        setRequestStatus(fetchStates.error);
      } else {
        alert("Payment successful!");
        dispatch(clearCart());
        history.push("/order");
      }
    } catch (error) {
      setRequestStatus(fetchStates.error);
    }
  };

  return (
    <Layout path={path} pageTitle="Chose Your Payment">
      <div className="checkout-page__body">
        {requestStatus === fetchStates.error && (
          <Message msgStatus={requestStatus} msgContent={message} />
        )}
        <form className="form">
          <div className="form-control flex-row-start">
            <input type="radio" id="payment" checked readOnly />
            <label htmlFor="payment">Payment Placeholder</label>
          </div>
        </form>
        <Message
          msgStatus="warning"
          msgContent="Sorry, I don't have any payment method to demonstrate this process."
        />
      </div>

      <CartSidebarLayout>
        <Button styleStatus="primary" onClickHandler={handleConfirmOrder}>
          Confirm the Order
        </Button>
      </CartSidebarLayout>
    </Layout>
  );
};

export default PaymentPage;
