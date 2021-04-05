import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllOrders, getOrders } from "../../../slices/orderSlice";
import fetchStates from "../../../utils/fetchStates";
import formatCurrency from "../../../utils/formatCurrency";

import { SubLayout as Layout } from "../../../components/Admin";
import {
  Table,
  Head,
  HeadCell,
  Row,
  Body,
  Cell,
} from "../../../components/Table";
import Button from "../../../components/Button";

const OrderList = () => {
  const { token } = useSelector((state) => state.user.loginUser);
  const orders = useSelector(selectAllOrders);
  const orderStatus = useSelector((state) => state.order.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (orderStatus === fetchStates.idle) {
      dispatch(getOrders(token));
    }
  }, [dispatch, orderStatus, token]);

  return (
    <Layout pageTitle="Order List">
      <Table>
        <Head>
          <Row>
            <HeadCell>#</HeadCell>
            <HeadCell>Number</HeadCell>
            <HeadCell>Place On</HeadCell>
            <HeadCell>Price</HeadCell>
            <HeadCell>Status</HeadCell>
            <HeadCell>Actions</HeadCell>
          </Row>
        </Head>
        <Body>
          {orders.map((order, index) => (
            <Row key={order.id}>
              <Cell>{index + 1}</Cell>
              <Cell>{order.number}</Cell>
              <Cell>{new Date(order.createdAt).toLocaleString()}</Cell>
              <Cell>${formatCurrency(order.value)}</Cell>
              <Cell>{order.status}</Cell>
              <Cell>
                <Button variant="info" href={`/admin/orders/edit/${order.id}`}>
                  View
                </Button>
              </Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </Layout>
  );
};

export default OrderList;
