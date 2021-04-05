import { SubLayout as Layout } from "../../../components/Admin";
import { Form, Label, Input } from "../../../components/Form";
import Button from "../../../components/Button";
import TextLink from "../../../components/TextLink";

const CategoryAddForm = () => {
  return (
    <Layout pageTitle="Add New Category">
      <TextLink to="/admin/categories">&larr; Back to category list</TextLink>
      <Form>
        <Label>Category Title</Label>
        <Input type="text" id="title" name="title" />
        <Button variant="info">Save</Button>
      </Form>
    </Layout>
  );
};

export default CategoryAddForm;
