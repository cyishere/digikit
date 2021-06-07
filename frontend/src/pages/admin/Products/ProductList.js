import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  selectAllProducts,
  getAllProducts,
  deleteProduct,
} from "../../../slices/productSlice";
import { selectLoginUser } from "../../../slices/userSlice";
import { updateWithProductRemoved } from "../../../slices/categorySlice";
import fetchStates from "../../../utils/fetchStates";
import formatCurrency from "../../../utils/formatCurrency";

import styled from "styled-components/macro";
import { Eye, Create, Trash } from "@styled-icons/ionicons-outline";
import { COLORS } from "../../../styles/constants";
import { SubLayout as Layout } from "../../../components/Admin";
import {
  Table,
  Head,
  HeadCell,
  Row,
  Body,
  Cell,
} from "../../../components/Table";
import Button from "../../../components/Button";
import Message from "../../../components/Message";

const ProductList = () => {
  const products = useSelector(selectAllProducts);
  const productStatus = useSelector((state) => state.product.status);
  const message = useSelector((state) => state.product.message);
  const { token } = useSelector(selectLoginUser);

  const [deleteStatus, setDeleteStatus] = useState(fetchStates.idle);

  const dispatch = useDispatch();

  useEffect(() => {
    if (productStatus === fetchStates.idle) {
      dispatch(getAllProducts());
    }
  }, [dispatch, productStatus]);

  const handleDelete = async (productId, categoryId) => {
    try {
      const actionResult = await dispatch(deleteProduct({ productId, token }));
      const result = unwrapResult(actionResult);

      if (result.type === fetchStates.error) {
        setDeleteStatus(fetchStates.error);
      } else {
        // update the category
        dispatch(updateWithProductRemoved({ productId, categoryId }));
      }
    } catch (error) {
      setDeleteStatus(fetchStates.error);
    }
  };

  return (
    <Layout pageTitle="Product List">
      <BtnWrapper>
        <Button href="/admin/products/add" variant="info">
          New
        </Button>
      </BtnWrapper>

      {deleteStatus === fetchStates.error && (
        <Message variant="danger">{message}</Message>
      )}

      <Table>
        <Head>
          <Row>
            <HeadCell>#</HeadCell>
            <HeadCell>Pictures</HeadCell>
            <HeadCell>Title</HeadCell>
            <HeadCell>Price</HeadCell>
            <HeadCell>Count in Stock</HeadCell>
            <HeadCell>Actions</HeadCell>
          </Row>
        </Head>
        <Body>
          {products.map((product, index) => (
            <Row key={product.id}>
              <Cell>{index + 1}</Cell>
              <Cell>
                <Img src={product.images[0]} alt={product.title} />
              </Cell>
              <Cell>{product.title}</Cell>
              <Cell>${formatCurrency(product.price)}</Cell>
              <Cell>{product.countInStock}</Cell>
              <Cell>
                <Button variant="info" href={`/products/${product.id}`}>
                  <Eye size="24" />
                </Button>
                <Button
                  variant="secondary"
                  href={`/admin/products/edit/${product.id}`}
                >
                  <Create size="24" />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.id, product.category)}
                >
                  <Trash size="24" />
                </Button>
              </Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </Layout>
  );
};

const BtnWrapper = styled.section`
  margin-bottom: 48px;
`;

const Img = styled.img`
  width: 100px;
  border: 1px solid ${COLORS.adminGray};
`;

export default ProductList;
