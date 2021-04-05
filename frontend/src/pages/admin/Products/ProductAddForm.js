import { SubLayout as Layout } from "../../../components/Admin";
import { Form, Label, Input, Textarea } from "../../../components/Form";
import Button from "../../../components/Button";
import TextLink from "../../../components/TextLink";

const ProductAddForm = () => {
  return (
    <Layout pageTitle="Add New Product">
      <TextLink to="/admin/products">&larr; Back to product list</TextLink>
      <Form>
        <Label htmlFor="title">Product Title</Label>
        <Input type="text" id="title" name="title" />

        <Label htmlFor="price">Price</Label>
        <Input type="number" id="price" name="price" />

        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description"></Textarea>

        <Label htmlFor="brand">Brand</Label>
        <Input type="text" id="brand" name="brand" />

        <Label htmlFor="category">Category</Label>
        <select name="category" id="category">
          <option>--</option>
        </select>

        <Label htmlFor="countInStock">Count in Stock</Label>
        <Input type="text" id="countInStock" name="countInStock" />

        <Label htmlFor="imageUrl">Picturue</Label>
        <Input
          type="text"
          id="imageUrl"
          name="imageUrl"
          placeholder="Please put the url of the image here"
        />

        <Button variant="info">Save</Button>
      </Form>
    </Layout>
  );
};

export default ProductAddForm;
