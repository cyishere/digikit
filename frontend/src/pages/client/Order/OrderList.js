import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../slices/orderSlice";

import styled from "styled-components/macro";
import { COLORS } from "../../../styles/constants";
import { Sidebar, SidebarCard } from "../../../components/Sidebar";
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

const settings = [
  { id: "1", title: "Orders" },
  { id: "2", title: "Profile" },
];

const OrderList = () => {
  const orders = useSelector((state) => state.order.entities);
  const { token } = useSelector((state) => state.user.loginUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders(token));
  }, [dispatch, token]);

  return (
    <Layout>
      <Sidebar>
        <SidebarCard title="Settings" listContent={settings} />
      </Sidebar>
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
