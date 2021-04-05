import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllCategories,
  getAllCategories,
} from "../../../slices/categorySlice";
import fetchStates from "../../../utils/fetchStates";

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
  const categories = useSelector(selectAllCategories);
  const categoryStatus = useSelector((state) => state.category.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryStatus === fetchStates.idle) {
      dispatch(getAllCategories());
    }
  }, [categoryStatus, dispatch]);

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
          {categories.map((category, index) => (
            <Row key={category.id}>
              <Cell>{index + 1}</Cell>
              <Cell>{category.title}</Cell>
              <Cell>{category.products.length}</Cell>
              <Cell>
                <Button
                  variant="info"
                  href={`/admin/categories/edit/${category.id}`}
                >
                  Edit
                </Button>
              </Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </Layout>
  );
};

const BtnWrapper = styled.section`
  margin-bottom: 48px;
`;

export default CategoryList;
