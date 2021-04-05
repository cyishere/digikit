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

const UserList = () => {
  return (
    <Layout pageTitle="User List">
      <Table>
        <Head>
          <Row>
            <HeadCell>#</HeadCell>
            <HeadCell>Name</HeadCell>
            <HeadCell>Email</HeadCell>
            <HeadCell>Orders</HeadCell>
            <HeadCell>Actions</HeadCell>
          </Row>
        </Head>
        <Body>
          <Row>
            <Cell>1</Cell>
            <Cell>Debbie Ocean</Cell>
            <Cell>debbie@oceans.com</Cell>
            <Cell>117</Cell>
            <Cell>
              <Button variant="info">View</Button>
            </Cell>
          </Row>
        </Body>
      </Table>
    </Layout>
  );
};

export default UserList;
