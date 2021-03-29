import styled from "styled-components/macro";

const Head = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.thead``;

export default Head;
