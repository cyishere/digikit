import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import Layout from "./Layout";

const SubLayout = ({ children, pageTitle }) => {
  return (
    <Layout>
      <Section>
        <Header>{pageTitle}</Header>
        {children}
      </Section>
    </Layout>
  );
};

const Section = styled.section`
  background-color: ${COLORS.white};
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 1px 4px 10px -1px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  font-size: 1.25rem;
  text-transform: uppercase;
  color: ${COLORS.textLight};
  margin-bottom: 48px;
`;

export default SubLayout;
