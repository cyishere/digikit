import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAcess } from "../../slices/userSlice";
import { getAllCategories } from "../../features/category/categorySlice";
import { addNewProduct } from "../../features/product/productSlice";
import { useFormChange } from "../../utils/hooks";
import fetchStates from "../../utils/fetchStates";
import Layout from "./Layout";
import PageHeader from "../../components/PageHeader";
import Message from "../../components/Message";

const ProductForm = ({ token }) => {
  const authAcessStatus = useSelector((state) => state.user.authAcessStatus);
  const categories = useSelector((state) => state.category.entities);
  const [requestStatus, setRequestStatus] = useState(fetchStates.idle);
  const requestMsg = useSelector((state) => state.product.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authAcess(token));

    if (categories.length < 1) {
      dispatch(getAllCategories());
    }
  }, [token, dispatch, categories]);

  const { values, handleChange, resetValues } = useFormChange({
    title: "",
    description: "",
    price: 0,
    brand: "",
    countInStock: 0,
    imageUrl: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryId = e.target.category.value;

    const productInfo = { ...values, category: categoryId };
    const result = await dispatch(addNewProduct({ productInfo, token }));

    if (result.payload.type === "error") {
      setRequestStatus(fetchStates.error);
    } else {
      setRequestStatus(fetchStates.success);
      resetValues();
    }
  };

  if (!authAcessStatus)
    return <Message msgContent="403 Unauthorized" msgStatus="error" />;

  return (
    <Layout>
      <PageHeader>Add Product</PageHeader>

      {(requestStatus === fetchStates.error ||
        requestStatus === fetchStates.success) && (
        <Message msgContent={requestMsg} msgStatus={requestStatus} />
      )}

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={values.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={values.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={values.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            name="brand"
            id="brand"
            value={values.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select name="category" id="category" required>
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
          <input
            type="number"
            name="countInStock"
            id="countInStock"
            value={values.countInStock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={values.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button className="button button-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default ProductForm;
