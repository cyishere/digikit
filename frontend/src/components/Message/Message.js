import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";

const Message = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  color: ${COLORS.danger};
  background-color: ${COLORS.dangerLight};
  border: 1px solid currentColor;
  padding: 16px;
  margin-bottom: 32px;
`;

export default Message;
