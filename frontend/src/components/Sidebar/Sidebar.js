import styled from "styled-components/macro";

const Sidebar = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.aside`
  padding: 36px;
`;

export default Sidebar;
