import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAcess } from "../../slices/userSlice";
import { addNewCategory } from "../../features/category/categorySlice";
import { useFormChange } from "../../utils/hooks";
import fetchStates from "../../utils/fetchStates";
import Layout from "./Layout";
import PageHeader from "../../components/PageHeader";
import Message from "../../components/Message";

const CategoryForm = ({ token }) => {
  const { values, handleChange, resetValues } = useFormChange({ title: "" });
  const [requestStatus, setRequestStatus] = useState(fetchStates.idle);

  const authAcessStatus = useSelector((state) => state.user.authAcessStatus);

  const requestMsg = useSelector((state) => state.category.message);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(authAcess(token));
    }
  }, [token, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      addNewCategory({ cateInfo: { ...values }, token })
    );

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
      <PageHeader>Add Category</PageHeader>

      {(requestStatus === fetchStates.error ||
        requestStatus === fetchStates.success) && (
        <Message msgContent={requestMsg} msgStatus={requestStatus} />
      )}

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Category Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            required
          />
        </div>

        <button className="button button-primary" type="submit">
          Save
        </button>
      </form>
    </Layout>
  );
};

export default CategoryForm;
