import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCategoryById } from "../../../slices/categorySlice";
import fetchStates from "../../../utils/fetchStates";

import { SubLayout as Layout } from "../../../components/Admin";
import { Form, Label, Input } from "../../../components/Form";
import Button from "../../../components/Button";
import TextLink from "../../../components/TextLink";

const CategoryEditForm = ({ match }) => {
  const { categoryId } = match.params;

  const category = useSelector((state) =>
    selectCategoryById(state, categoryId)
  );

  const [title, setTitle] = useState(category.title);

  return (
    <Layout pageTitle="Edit Category">
      <TextLink to="/admin/categories">&larr; Back to category list</TextLink>
      <Form>
        <Label>Category Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="info">Save</Button>
      </Form>
    </Layout>
  );
};

export default CategoryEditForm;
