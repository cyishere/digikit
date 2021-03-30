import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../slices/productSlice";
import { getAllCategories } from "../../../slices/categorySlice";
import fetchStates from "../../../utils/fetchStates";

import styled from "styled-components/macro";
import { COLORS } from "../../../styles/constants";
import Layout from "../SubLayout";
import { Sidebar, SidebarCard } from "../../../components/Sidebar";
import Card from "../../../components/Card";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";

// const categories = [
//   { id: "1", name: "Speaker" },
//   { id: "2", name: "Headphone" },
//   { id: "3", name: "Keyboard" },
// ];

const brands = [
  { id: "1", title: "B&O" },
  { id: "2", title: "GMK" },
  { id: "3", title: "IQUNIX" },
  { id: "4", title: "HHBK" },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.entities);
  const productStatus = useSelector((state) => state.product.status);
  const productError = useSelector((state) => state.product.message);
  const categories = useSelector((state) => state.category.entities);
  const categoryStatus = useSelector((state) => state.category.status);
  const categoryError = useSelector((state) => state.category.message);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(getAllProducts());
    }
    if (categoryStatus === "idle") {
      dispatch(getAllCategories());
    }
  }, [categoryStatus, dispatch, productStatus]);

  let content, sidebarCategories;

  if (productStatus === fetchStates.fetching) {
    content = <Loader />;
  } else if (productStatus === fetchStates.success) {
    content = products.map((product) => (
      <Card
        key={product.id}
        id={product.id}
        title={product.title}
        image={product.images[0]}
        price={product.price}
      />
    ));
  } else if (productStatus === fetchStates.error) {
    content = <Message variant="danger">{productError}</Message>;
  }

  if (categoryStatus === fetchStates.fetching) {
    sidebarCategories = <Loader />;
  } else if (categoryStatus === fetchStates.success) {
    sidebarCategories = (
      <SidebarCard title="Category" listContent={categories} />
    );
  } else if (categoryStatus === fetchStates.error) {
    sidebarCategories = <Message variant="danger">{categoryError}</Message>;
  }

  return (
    <Layout>
      <Sidebar>
        {sidebarCategories}
        <SidebarCard title="Brand" listContent={brands} />
      </Sidebar>
      <MainContainer>{content}</MainContainer>
    </Layout>
  );
};

const MainContainer = styled.main`
  background-color: ${COLORS.white};
  border-top: 8px solid ${COLORS.grayLight};
  padding: 36px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 36px;
`;

export default ProductList;
