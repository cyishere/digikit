import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  selectAllCategories,
  getAllCategories,
  deleteCategory,
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
import Message from "../../../components/Message";

const CategoryList = () => {
  const categories = useSelector(selectAllCategories);
  const categoryStatus = useSelector((state) => state.category.status);
  const message = useSelector((state) => state.category.message);
  const { token } = useSelector((state) => state.user.loginUser);
  const [deleteStatus, setDeleteStatus] = useState(fetchStates.idle);

  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryStatus === fetchStates.idle) {
      dispatch(getAllCategories());
    }
  }, [categoryStatus, dispatch]);

  const handleDelete = async (categoryId) => {
    try {
      const actionResult = await dispatch(
        deleteCategory({ categoryId, token })
      );
      const result = unwrapResult(actionResult);
      if (result.type === fetchStates.error) {
        setDeleteStatus(fetchStates.error);
      }
    } catch (error) {
      setDeleteStatus(fetchStates.error);
    }
  };

  return (
    <Layout pageTitle="Category List">
      <BtnWrapper>
        <Button href="/admin/categories/add" variant="info">
          New
        </Button>
      </BtnWrapper>

      {deleteStatus === fetchStates.error && (
        <Message variant="danger">{message}</Message>
      )}

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
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
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
