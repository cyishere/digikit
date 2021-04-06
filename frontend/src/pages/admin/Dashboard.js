import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styled from "styled-components/macro";
import { Basket, Cube, FileTray, People } from "@styled-icons/ionicons-outline";
import { COLORS } from "../../styles/constants";
import { Layout } from "../../components/Admin";

const Dashboard = () => {
  const categories = useSelector((state) => state.category.entities);

  return (
    <Layout>
      <Section>
        <Title>
          <Cube />
          <TextLink to="/admin/products">Products</TextLink>
        </Title>

        <Number>187</Number>
      </Section>
      <Section>
        <Title>
          <Basket />
          <TextLink to="/admin/orders">Orders</TextLink>
        </Title>

        <Number>187</Number>
      </Section>
      <Section>
        <Title>
          <FileTray />
          <TextLink to="/admin/categories">Categories</TextLink>
        </Title>

        <Number>{categories.length}</Number>
      </Section>
      <Section>
        <Title>
          <People />
          <TextLink to="/admin/users">Users</TextLink>
        </Title>

        <Number>3</Number>
      </Section>
    </Layout>
  );
};

const Section = styled.article`
  background-color: ${COLORS.white};
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 1px 4px 10px -1px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: none;
  }
`;

const Title = styled.h2`
  display: grid;
  grid-template-columns: 60px 1fr;
  align-items: center;
  grid-gap: 16px;
  font-size: 36px;

  svg {
    color: ${COLORS.adminPrimaryLight};
  }
`;

const TextLink = styled(Link)`
  color: ${COLORS.text};
  text-decoration: none;

  &:hover {
    color: ${COLORS.adminPrimary};
    text-decoration: revert;
  }
`;

const Number = styled.em`
  font-size: 2rem;
  color: ${COLORS.textLight};
`;

export default Dashboard;
