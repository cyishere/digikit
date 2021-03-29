import styled from "styled-components/macro";

const Body = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.tbody``;

export default Body;
