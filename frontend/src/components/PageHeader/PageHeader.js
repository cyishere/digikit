import styled from "styled-components/macro";

const PageHeader = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.h1`
  font-size: 2rem;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 48px;
`;

export default PageHeader;
