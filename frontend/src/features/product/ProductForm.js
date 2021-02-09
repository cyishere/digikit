import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAcess } from "../user/userSlice";
import { getAllCategories } from "../category/categorySlice";
import PageHeader from "../../components/PageHeader/PageHeader";
import Message from "../../components/Message/Message";
import "../../styles/form.scss";
import "../../styles/button.scss";

const ProductForm = ({ token }) => {
  const { message, authAcessStatus } = useSelector((state) => state.user);
  const categories = useSelector((state) => state.category.entities);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(authAcess(token));
    }
    if (categories.length < 1) {
      dispatch(getAllCategories());
    }
  }, [token, dispatch, categories]);

  if (!token)
    return <Message msgContent="403 Unauthorized" msgStatus="error" />;

  return (
    <main className="ms-page">
      <PageHeader titleText="Add Product" />

      {authAcessStatus ? (
        <form className="form">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="form-control">
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description"></textarea>
          </div>
          <div className="form-control">
            <label htmlFor="price">Price</label>
            <input type="number" name="price" id="price" />
          </div>
          <div className="form-control">
            <label htmlFor="brand">Brand</label>
            <input type="text" name="brand" id="brand" />
          </div>
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select name="category" id="category">
              <option value="">--</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="countInStock">Number In Stock:</label>
            <input type="number" name="countInStock" id="countInStock" />
          </div>
          <div className="form-control">
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" name="imageUrl" id="imageUrl" />
          </div>
          <div className="form-actions">
            <button className="button button-primary">Submit</button>
          </div>
        </form>
      ) : (
        <Message msgContent={message} msgStatus="error" />
      )}
    </main>
  );
};

export default ProductForm;
