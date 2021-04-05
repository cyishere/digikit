import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProducts,
  getAllProducts,
} from "../../../slices/productSlice";
import fetchStates from "../../../utils/fetchStates";
import formatCurrency from "../../../utils/formatCurrency";

import styled from "styled-components/macro";
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

const ProductList = () => {
  const products = useSelector(selectAllProducts);
  const productStatus = useSelector((state) => state.product.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (productStatus === fetchStates.idle) {
      dispatch(getAllProducts());
    }
  }, [dispatch, productStatus]);

  return (
    <Layout pageTitle="Product List">
      <BtnWrapper>
        <Button href="/admin/products/add" variant="info">
          New
        </Button>
      </BtnWrapper>
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
                  View &#8599;
                </Button>
                <Button
                  variant="secondary"
                  href={`/admin/products/edit/${product.id}`}
                >
                  Edit
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
