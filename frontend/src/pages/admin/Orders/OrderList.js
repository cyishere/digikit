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
          <Row>
            <Cell>1</Cell>
            <Cell>dskejwiej-3232</Cell>
            <Cell>2021-03-24 15:17</Cell>
            <Cell>$117.00</Cell>
            <Cell>New</Cell>
            <Cell>
              <Button variant="info" href="/admin/orders/edit/1">
                View
              </Button>
            </Cell>
          </Row>
        </Body>
      </Table>
    </Layout>
  );
};

export default OrderList;
