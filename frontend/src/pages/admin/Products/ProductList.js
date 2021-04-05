import styled from "styled-components/macro";
import { COLORS } from "../../../styles/constants";
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

const ProductList = () => {
  return (
    <Layout pageTitle="Product List">
      <Table>
        <Head>
          <Row>
            <HeadCell>#</HeadCell>
            <HeadCell>Pictures</HeadCell>
            <HeadCell>Title</HeadCell>
            <HeadCell>Price</HeadCell>
            <HeadCell>Count in Stock</HeadCell>
            <HeadCell>Actions</HeadCell>
          </Row>
        </Head>
        <Body>
          <Row>
            <Cell>1</Cell>
            <Cell>
              <Img src="/assets/products/gmk-maestro.jpg" alt="GMK Maestro" />
            </Cell>
            <Cell>GMK Maestro</Cell>
            <Cell>$117.00</Cell>
            <Cell>287</Cell>
            <Cell>
              <Button variant="info">View</Button>
            </Cell>
          </Row>
        </Body>
      </Table>
    </Layout>
  );
};

const Img = styled.img`
  width: 100px;
  border: 1px solid ${COLORS.adminGray};
`;

export default ProductList;
