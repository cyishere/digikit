import styled from "styled-components/macro";
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

const CategoryList = () => {
  return (
    <Layout pageTitle="Category List">
      <BtnWrapper>
        <Button href="/admin/categories/add" variant="info">
          New
        </Button>
      </BtnWrapper>

      <Table>
        <Head>
          <Row>
            <HeadCell>#</HeadCell>
            <HeadCell>Title</HeadCell>
            <HeadCell>Products Count</HeadCell>
            <HeadCell>Actions</HeadCell>
          </Row>
        </Head>
        <Body>
          <Row>
            <Cell>1</Cell>
            <Cell>Keyboard</Cell>
            <Cell>2021</Cell>
            <Cell>
              <Button variant="info" href="/admin/categories/edit/1">
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

export default CategoryList;
