import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../slices/orderSlice";
import PageHeader from "../../components/PageHeader";
import LinkButton from "../../components/Button/LinkButton";
import "../../styles/table.scss";
import { useEffect } from "react";

const OrderHistory = () => {
  const { token } = useSelector((state) => state.user.loginUser);
  const orders = useSelector((state) => state.order.entities);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      await dispatch(getOrders(token));
    };
    fetchOrders();
  }, []);

  return (
    <main className="main-page">
      <PageHeader>Order History</PageHeader>
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
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
};

export default OrderHistory;
