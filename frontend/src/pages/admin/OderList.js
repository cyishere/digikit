import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAcess } from "../../slices/userSlice";
import { getOrders, deleteOrder } from "../../slices/orderSlice";
import fetchStates from "../../utils/fetchStates";
import Layout from "./Layout";
import PageHeader from "../../components/PageHeader";
import Message from "../../components/Message";
import LinkButton from "../../components/Button/LinkButton";

const OderList = ({ token }) => {
  const authAcessStatus = useSelector((state) => state.user.authAcessStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!authAcessStatus) {
      dispatch(authAcess(token));
    }
  }, [token, dispatch, authAcessStatus]);

  useEffect(() => {
    dispatch(getOrders(token));
  }, [token, dispatch]);

  const { entities: orders, message } = useSelector((state) => state.order);
  const [requestStatus, setRequestStatus] = useState(fetchStates.idle);

  const handleDelete = async (orderId) => {
    try {
      const result = await dispatch(deleteOrder({ orderId, token }));

      if (result.payload.type === "error") {
        setRequestStatus(fetchStates.error);
      }
    } catch (error) {
      setRequestStatus(fetchStates.error);
    }
  };

  if (!authAcessStatus)
    return <Message msgContent="403 Unauthorized" msgStatus="error" />;

  return (
    <Layout>
      <PageHeader>Order List</PageHeader>

      {requestStatus === fetchStates.error && (
        <Message msgStatus={requestStatus} msgContent={message} />
      )}

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Order Number</th>
            <th>Place On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="4">You haven't bought anything.</td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.number}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <LinkButton
                    styleStatus="primary"
                    toDirection={`/order/${order.id}`}
                  >
                    View
                  </LinkButton>
                  <div
                    className="button"
                    onClick={() => handleDelete(order.id)}
                  >
                    <i className="las la-trash-alt"></i>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
};

export default OderList;
