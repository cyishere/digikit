import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";

const Table = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export const Wrapper = styled.table`
  background-color: ${COLORS.white};
  width: 100%;
`;

export default Table;
