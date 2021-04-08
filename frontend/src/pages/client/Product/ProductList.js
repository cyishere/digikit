import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProducts,
  getAllProducts,
  selectProductsByCategory,
  selectProductsByBrand,
} from "../../../slices/productSlice";
import {
  selectAllCategories,
  getAllCategories,
} from "../../../slices/categorySlice";
import fetchStates from "../../../utils/fetchStates";

import styled from "styled-components/macro";
import { COLORS } from "../../../styles/constants";
import Layout from "../SubLayout";
import {
  Sidebar,
  SidebarCard,
  SidebarCardItem,
} from "../../../components/Sidebar";
import Card from "../../../components/Card";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";

const brands = [
  { id: "1", title: "Bang & Olufsen" },
  { id: "2", title: "Keychron" },
  { id: "3", title: "IQUNIX" },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const productStatus = useSelector((state) => state.product.status);
  const productError = useSelector((state) => state.product.message);
  const categories = useSelector(selectAllCategories);
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

  const [filterCategory, setFilterCategory] = useState(null);
  const [filterBrand, setFilterBrand] = useState(null);

  // Filer by category
  const chooseCategory = (categoryId) => {
    setFilterCategory(categoryId);
    setFilterBrand(null);
  };
  const productsInCertainCategory = useSelector((state) =>
    selectProductsByCategory(state, filterCategory)
  );

  // Filter by brand
  const chooseBrand = (brand) => {
    setFilterBrand(brand);
    setFilterCategory(null);
  };
  const productsInCertainBrand = useSelector((state) =>
    selectProductsByBrand(state, filterBrand)
  );

  let content, sidebarCategories, filteredProducts;

  if (productStatus === fetchStates.fetching) {
    content = <Loader />;
  } else if (productStatus === fetchStates.success) {
    if (filterCategory === null && filterBrand === null) {
      filteredProducts = products;
    } else if (filterBrand === null) {
      filteredProducts = productsInCertainCategory;
    } else if (filterCategory === null) {
      filteredProducts = productsInCertainBrand;
    }

    content = filteredProducts.map((product) => (
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
      <SidebarCard title="Category">
        <ul>
          <SidebarCardItem
            name="All"
            isActive={filterCategory === null}
            onClick={() => chooseCategory(null)}
          />
          {categories.map((item) => (
            <SidebarCardItem
              key={item.id}
              name={item.title}
              onClick={() => chooseCategory(item.id)}
              isActive={filterCategory === item.id}
            />
          ))}
        </ul>
      </SidebarCard>
    );
  } else if (categoryStatus === fetchStates.error) {
    sidebarCategories = <Message variant="danger">{categoryError}</Message>;
  }

  return (
    <Layout>
      <Sidebar>
        {sidebarCategories}
        <SidebarCard title="Brand">
          <ul>
            <SidebarCardItem
              name="All"
              isActive={filterBrand === null}
              onClick={() => chooseBrand(null)}
            />
            {brands.map((item) => (
              <SidebarCardItem
                key={item.id}
                name={item.title}
                onClick={() => chooseBrand(item.title)}
                isActive={filterBrand === item.title}
              />
            ))}
          </ul>
        </SidebarCard>
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
