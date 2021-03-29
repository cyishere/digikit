import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";

const Crumb = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.li`
  display: inline-block;
  color: ${COLORS.textLight};
  margin-right: 8px;

  &:not(:first-child)::before {
    content: "";
    display: inline-block;
    transform: rotate(15deg);
    border-right: 1px solid currentColor;
    height: 0.8em;
    margin-right: 8px;
  }
`;

export default Crumb;
