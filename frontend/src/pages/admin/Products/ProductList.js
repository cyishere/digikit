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
      <BtnWrapper>
        <Button href="/admin/products/add" variant="info">
          New
        </Button>
      </BtnWrapper>
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
              <Button variant="info" href="/products/1">
                View &#8599;
              </Button>
              <Button variant="secondary" href="/admin/products/edit/1">
                Edit
              </Button>
            </Cell>
          </Row>
        </Body>
      </Table>
    </Layout>
  );
};

const BtnWrapper = styled.section`
  margin-bottom: 48px;
`;

const Img = styled.img`
  width: 100px;
  border: 1px solid ${COLORS.adminGray};
`;

export default ProductList;
