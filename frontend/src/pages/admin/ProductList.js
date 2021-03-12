import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAcess } from "../../slices/userSlice";
import Layout from "./Layout";
import PageHeader from "../../components/PageHeader";
import Message from "../../components/Message";
import LinkButton from "../../components/Button/LinkButton";

const ProductList = ({ token }) => {
  const authAcessStatus = useSelector((state) => state.user.authAcessStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authAcess(token));
  }, [token, dispatch]);

  if (!authAcessStatus)
    return <Message msgContent="403 Unauthorized" msgStatus="error" />;

  return (
    <Layout>
      <PageHeader>Product List</PageHeader>
      <LinkButton styleStatus="primary" toDirection="/admin/product/add">
        <i className="las la-plus-circle mr-10"></i> New Product
      </LinkButton>
    </Layout>
  );
};

export default ProductList;
