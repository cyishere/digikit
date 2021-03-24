import styled from "styled-components/macro";
import { COLORS } from "../../utils/constants";

const Button = ({ children, ...rest }) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

const Wrapper = styled.button`
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  padding: 8px 16px;
  text-transform: uppercase;
  border: none;
`;

export default Button;
