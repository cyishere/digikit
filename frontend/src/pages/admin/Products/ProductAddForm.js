import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  selectAllCategories,
  updateWithProductAdded,
} from "../../../slices/categorySlice";
import { selectLoginUser } from "../../../slices/userSlice";
import { addNewProduct } from "../../../slices/productSlice";
import { useFormChange } from "../../../utils/hooks";
import fetchStates from "../../../utils/fetchStates";

import { SubLayout as Layout } from "../../../components/Admin";
import { Form, Label, Input, Textarea, Select } from "../../../components/Form";
import Button from "../../../components/Button";
import TextLink from "../../../components/TextLink";
import Message from "../../../components/Message";

const ProductAddForm = () => {
  const categories = useSelector(selectAllCategories);
  const { token } = useSelector(selectLoginUser);
  const message = useSelector((state) => state.product.message);
  const [requestStatus, setRequestStatus] = useState(fetchStates.idle);
  const { values, handleChange, resetValues } = useFormChange({
    title: "",
    price: 0,
    description: "",
    brand: "",
    imageUrl: "",
    countInStock: 0,
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryId = e.target.category.value;
    const productInfo = {
      ...values,
      category: categoryId,
    };
    const actionResult = await dispatch(addNewProduct({ productInfo, token }));
    const result = unwrapResult(actionResult);

    if (result.type === fetchStates.error) {
      setRequestStatus(fetchStates.error);
    } else {
      const productId = result.product.id;
      dispatch(updateWithProductAdded({ productId, categoryId }));
      setRequestStatus(fetchStates.success);
      resetValues();
    }
  };

  return (
    <Layout pageTitle="Add New Product">
      <TextLink to="/admin/products">&larr; Back to product list</TextLink>
      {requestStatus === fetchStates.error && (
        <Message variant="danger">{message}</Message>
      )}
      {requestStatus === fetchStates.success && (
        <Message variant="success">{message}</Message>
      )}
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="title">Product Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          required
        />

        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          name="price"
          value={values.price}
          onChange={handleChange}
          required
        />

        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          required
        ></Textarea>

        <Label htmlFor="brand">Brand</Label>
        <Input
          type="text"
          id="brand"
          name="brand"
          value={values.brand}
          onChange={handleChange}
          required
        />

        <Label htmlFor="category">Category</Label>
        <Select name="category" id="category">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </Select>

        <Label htmlFor="countInStock">Count in Stock</Label>
        <Input
          type="number"
          id="countInStock"
          name="countInStock"
          value={values.countInStock}
          onChange={handleChange}
          required
        />

        <Label htmlFor="imageUrl">Picturue</Label>
        <Input
          type="text"
          id="imageUrl"
          name="imageUrl"
          placeholder="Please put the url of the image here"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />

        <Button variant="info" type="submit">
          Save
        </Button>
      </Form>
    </Layout>
  );
};

export default ProductAddForm;
