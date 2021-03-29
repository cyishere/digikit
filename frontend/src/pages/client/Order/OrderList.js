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
  { id: "1", name: "Orders" },
  { id: "2", name: "Profile" },
];

const OrderList = () => {
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
            <Row>
              <Cell>1</Cell>
              <Cell>sejwoiwjeaj-93u978237</Cell>
              <Cell>2020-03-09 18:36</Cell>
              <Cell>Pending</Cell>
              <Cell>
                <Button variant="primary" href="/order/1">
                  View
                </Button>
              </Cell>
            </Row>
            <Row>
              <Cell>2</Cell>
              <Cell>sejwoiwjeaj-93u978237</Cell>
              <Cell>2020-03-09 18:36</Cell>
              <Cell>Shipped</Cell>
              <Cell>
                <Button variant="primary" href="/order/1">
                  View
                </Button>
              </Cell>
            </Row>
            <Row>
              <Cell>3</Cell>
              <Cell>sejwoiwjeaj-93u978237</Cell>
              <Cell>2020-03-09 18:36</Cell>
              <Cell>Finished</Cell>
              <Cell>
                <Button variant="primary" href="/order/1">
                  View
                </Button>
              </Cell>
            </Row>
            <Row>
              <Cell>4</Cell>
              <Cell>sejwoiwjeaj-93u978237</Cell>
              <Cell>2020-03-09 18:36</Cell>
              <Cell>Canceled</Cell>
              <Cell>
                <Button variant="primary" href="/order/1">
                  View
                </Button>
              </Cell>
            </Row>
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
