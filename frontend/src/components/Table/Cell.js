import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import { Wrapper as Row } from "./Row";

const Cell = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.td`
  padding: 24px;

  ${Row}:not(:last-child) & {
    border-bottom: 1px solid ${COLORS.gray};
  }
`;

export default Cell;
