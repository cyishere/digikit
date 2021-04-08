import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, selectOrdersByUser } from "../../../slices/orderSlice";
import fetchStates from "../../../utils/fetchStates";

import styled from "styled-components/macro";
import { COLORS } from "../../../styles/constants";
import SideMenu from "./SideMenu";
import Layout from "../SubLayout";
import PageHeader from "../../../components/PageHeader";
import {
  Table,
  Head,
  Body,
  Row,
  HeadCell,
  Cell,
} from "../../../components/Table";
import Button from "../../../components/Button";

const OrderList = ({ location }) => {
  const { userId, token } = useSelector((state) => state.user.loginUser);
  const orders = useSelector((state) => selectOrdersByUser(state, userId));
  const status = useSelector((state) => state.order.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === fetchStates.idle) {
      dispatch(getOrders(token));
    }
  }, [dispatch, status, token]);

  return (
    <Layout>
      <SideMenu location={location} />
      <MainContainer>
        <PageHeader>Order List</PageHeader>
        <Table>
          <Head>
            <Row>
              <HeadCell>#</HeadCell>
              <HeadCell>Order Number</HeadCell>
              <HeadCell>Place On</HeadCell>
              <HeadCell>Status</HeadCell>
              <HeadCell>Actions</HeadCell>
            </Row>
          </Head>
          <Body>
            {orders.length < 1 ? (
              <Row>
                <Cell colSpan="5">You haven't order anything.</Cell>
              </Row>
            ) : (
              <>
                {orders.map((order, index) => (
                  <Row key={order.id}>
                    <Cell>{index + 1}</Cell>
                    <Cell>{order.number}</Cell>
                    <Cell>{new Date(order.createdAt).toLocaleString()}</Cell>
                    <Cell>{order.status}</Cell>
                    <Cell>
                      <Button variant="primary" href={`/orders/${order.id}`}>
                        View
                      </Button>
                    </Cell>
                  </Row>
                ))}
              </>
            )}
          </Body>
        </Table>
      </MainContainer>
    </Layout>
  );
};

const MainContainer = styled.main`
  background-color: ${COLORS.white};
  border-top: 8px solid ${COLORS.grayLight};
  padding: 36px;
`;

export default OrderList;
