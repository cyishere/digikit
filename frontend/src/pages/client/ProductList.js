import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import Layout from "./Layout";
import Sidebar from "../../components/Sidebar";
import SidebarCard from "../../components/Sidebar/SidebarCard";
import Card from "../../components/Card";

const categories = [
  { id: "1", name: "Speaker" },
  { id: "2", name: "Headphone" },
  { id: "3", name: "Keyboard" },
];

const brands = [
  { name: "B&O" },
  { name: "GMK" },
  { name: "IQUNIX" },
  { name: "HHBK" },
];

const ProductList = () => {
  return (
    <Layout>
      <Grid>
        <Sidebar>
          <SidebarCard title="Category" listContent={categories} />
          <SidebarCard title="Brand" listContent={brands} />
        </Sidebar>
        <div>
          <MainContainer>
            <Card
              id="1"
              title="GMK Maestro"
              image="http://localhost:3000/assets/products/gmk-maestro.jpg"
              price="134.99"
            />
            <Card
              id="2"
              title="IQUNIX L80 Formula Typing Wireless Mechanical Keyboard"
              image="http://localhost:3000/assets/products/iqunix-f96.jpg"
              price="265"
            />
            <Card
              id="3"
              title="B&O Play Bang & Olufsen 1645126 H8i"
              image="http://localhost:3000/assets/products/b&o-h8i.jpg"
              price="293"
            />
          </MainContainer>
        </div>
      </Grid>
    </Layout>
  );
};

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 360px 1fr;
`;

const MainContainer = styled.main`
  background-color: ${COLORS.white};
  border-top: 8px solid ${COLORS.grayLight};
  padding: 36px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 36px;
`;

export default ProductList;
