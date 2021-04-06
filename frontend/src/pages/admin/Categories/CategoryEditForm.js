import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  selectCategoryById,
  updateCategory,
} from "../../../slices/categorySlice";
import { useFormChange } from "../../../utils/hooks";
import fetchStates from "../../../utils/fetchStates";

import { SubLayout as Layout } from "../../../components/Admin";
import { Form, Label, Input } from "../../../components/Form";
import Button from "../../../components/Button";
import TextLink from "../../../components/TextLink";
import Message from "../../../components/Message";

const CategoryEditForm = ({ match }) => {
  const { categoryId } = match.params;

  const category = useSelector((state) =>
    selectCategoryById(state, categoryId)
  );
  const { token } = useSelector((state) => state.user.loginUser);
  const message = useSelector((state) => state.category.message);

  const { values, handleChange } = useFormChange({
    title: category.title,
  });
  const [requestStatus, setRequestStatus] = useState(fetchStates.idle);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const actionResult = await dispatch(
        updateCategory({ cateInfo: { ...values, id: categoryId }, token })
      );
      const result = unwrapResult(actionResult);

      if (result.type === fetchStates.error) {
        setRequestStatus(fetchStates.error);
      } else {
        setRequestStatus(fetchStates.success);
      }
    } catch (error) {
      setRequestStatus(fetchStates.error);
    }
  };

  return (
    <Layout pageTitle="Edit Category">
      <TextLink to="/admin/categories">&larr; Back to category list</TextLink>
      {requestStatus === fetchStates.error && (
        <Message variant="danger">{message}</Message>
      )}
      {requestStatus === fetchStates.success && (
        <Message variant="success">{message}</Message>
      )}
      <Form onSubmit={handleSubmit}>
        <Label>Category Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
        />
        <Button variant="info" type="submit">
          Save
        </Button>
      </Form>
    </Layout>
  );
};

export default CategoryEditForm;
