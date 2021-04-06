import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useFormChange } from "../../../utils/hooks";
import { addNewCategory } from "../../../slices/categorySlice";
import fetchStates from "../../../utils/fetchStates";

import { SubLayout as Layout } from "../../../components/Admin";
import { Form, Label, Input } from "../../../components/Form";
import Button from "../../../components/Button";
import TextLink from "../../../components/TextLink";
import Message from "../../../components/Message";

const CategoryAddForm = () => {
  const { token } = useSelector((state) => state.user.loginUser);
  const { values, handleChange, resetValues } = useFormChange({
    title: "",
  });
  const message = useSelector((state) => state.category.message);
  const [requestStatus, setRequestStatus] = useState(fetchStates.idle);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const actionResult = await dispatch(
      addNewCategory({ cateInfo: values, token })
    );
    const result = unwrapResult(actionResult);
    if (result.type === fetchStates.error) {
      setRequestStatus(fetchStates.error);
    } else {
      setRequestStatus(fetchStates.success);
      resetValues();
    }
  };

  return (
    <Layout pageTitle="Add New Category">
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

export default CategoryAddForm;
