import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAcess } from "../../slices/userSlice";
import { getAllCategories } from "../../features/category/categorySlice";
import Layout from "./Layout";
import PageHeader from "../../components/PageHeader";
import Message from "../../components/Message";
import Button from "../../components/Button";
import LinkButton from "../../components/Button/LinkButton";

const CategoryList = ({ token }) => {
  const authAcessStatus = useSelector((state) => state.user.authAcessStatus);
  const categories = useSelector((state) => state.category.entities);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authAcess(token));
    if (authAcessStatus) {
      dispatch(getAllCategories());
    }
  }, [token, dispatch, authAcessStatus]);

  if (!authAcessStatus)
    return <Message msgContent="403 Unauthorized" msgStatus="error" />;

  return (
    <Layout>
      <PageHeader>
        Category List
        <div className="float-right">
          <LinkButton styleStatus="primary" toDirection="/admin/category/add">
            <i className="las la-plus-circle mr-10"></i> New Category
          </LinkButton>
        </div>
      </PageHeader>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Products Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories === 0 ? (
            <tr>
              <td colSpan="3">No category.</td>
            </tr>
          ) : (
            <>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.title}</td>
                  <td>{category.products.length}</td>
                  <td>
                    <Button styleStatus="danger">
                      <i className="las la-trash-alt"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </Layout>
  );
};

export default CategoryList;
