/* eslint-disable import/no-anonymous-default-export */
import { Table, Head, Body, Row, HeadCell, Cell } from "./";
import Button from "../Button";

export default {
  title: "Client/Table",
  component: Table,
};

export const OrderList = () => (
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
);
