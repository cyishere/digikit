import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { selectLoginUser } from "../../../slices/userSlice";
import { selectProductById, updateProduct } from "../../../slices/productSlice";
import {
  selectAllCategories,
  getAllCategories,
} from "../../../slices/categorySlice";
import { useFormChange } from "../../../utils/hooks";
import fetchStates from "../../../utils/fetchStates";

import { SubLayout as Layout } from "../../../components/Admin";
import { Form, Label, Input, Textarea, Select } from "../../../components/Form";
import Button from "../../../components/Button";
import TextLink from "../../../components/TextLink";
import Message from "../../../components/Message";
import { BackLinkWrapper } from "../../../components/Utils";

const ProductEditForm = ({ match }) => {
  const { productId } = match.params;
  const product = useSelector((state) => selectProductById(state, productId));
  const message = useSelector((state) => state.product.message);
  const categories = useSelector(selectAllCategories);
  const { token } = useSelector(selectLoginUser);
  const { values, handleChange } = useFormChange({
    ...product,
    imageUrl: product.images[0],
  });
  const [requestStatus, setRequestStatus] = useState(fetchStates.idle);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryId = e.target.category.value;

    try {
      const productInfo = {
        ...values,
        id: productId,
        category: categoryId,
      };

      const actionResult = await dispatch(
        updateProduct({ productInfo, token })
      );
      const result = unwrapResult(actionResult);

      if (result.type === fetchStates.error) {
        setRequestStatus(fetchStates.error);
      } else {
        setRequestStatus(fetchStates.success);

        // whether category is the same one
        if (categoryId !== product.category) {
          await dispatch(getAllCategories());
        }
      }
    } catch (error) {
      setRequestStatus(fetchStates.error);
    }
  };

  return (
    <Layout pageTitle="Edit Product">
      <BackLinkWrapper>
        <TextLink to="/admin/products">&larr; Back to product list</TextLink>
      </BackLinkWrapper>

      <Form onSubmit={handleSubmit}>
        <Label htmlFor="title">Product Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
        />

        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          name="price"
          value={values.price}
          onChange={handleChange}
        />

        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
        ></Textarea>

        <Label htmlFor="brand">Brand</Label>
        <Input
          type="text"
          id="brand"
          name="brand"
          value={values.brand}
          onChange={handleChange}
        />

        <Label htmlFor="category">Category</Label>
        <Select name="category" id="category" defaultValue={product.category}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </Select>

        <Label htmlFor="countInStock">Count in Stock</Label>
        <Input
          type="text"
          id="countInStock"
          name="countInStock"
          value={values.countInStock}
          onChange={handleChange}
        />

        <Label htmlFor="imageUrl">Picturue</Label>
        <Input
          type="text"
          id="imageUrl"
          name="imageUrl"
          placeholder="Please put the url of the image here"
          value={values.imageUrl}
          onChange={handleChange}
        />

        <Button variant="info" type="submit">
          Save
        </Button>
      </Form>

      {requestStatus === fetchStates.error && (
        <Message variant="danger">{message}</Message>
      )}
      {requestStatus === fetchStates.success && (
        <Message variant="success">{message}</Message>
      )}
    </Layout>
  );
};

export default ProductEditForm;
