import { useSelector } from "react-redux";
import { selectProductById } from "../../../slices/productSlice";
import { selectAllCategories } from "../../../slices/categorySlice";
import { useFormChange } from "../../../utils/hooks";

import { SubLayout as Layout } from "../../../components/Admin";
import { Form, Label, Input, Textarea } from "../../../components/Form";
import Button from "../../../components/Button";
import TextLink from "../../../components/TextLink";

const ProductEditForm = ({ match }) => {
  const { productId } = match.params;
  const product = useSelector((state) => selectProductById(state, productId));
  const categories = useSelector(selectAllCategories);
  const { values, handleChange } = useFormChange(product);

  return (
    <Layout pageTitle="Edit Product">
      <TextLink to="/admin/products">&larr; Back to product list</TextLink>
      <Form>
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
        <Textarea id="description" name="description" onChange={handleChange}>
          {values.description}
        </Textarea>

        <Label htmlFor="brand">Brand</Label>
        <Input
          type="text"
          id="brand"
          name="brand"
          value={values.brand}
          onChange={handleChange}
        />

        <Label htmlFor="category">Category</Label>
        <select name="category" id="category" defaultValue={product.category}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>

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

        <Button variant="info">Save</Button>
      </Form>
    </Layout>
  );
};

export default ProductEditForm;
