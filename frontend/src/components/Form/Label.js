import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";

const Label = ({ children, ...rest }) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

const Wrapper = styled.label`
  display: block;
  color: ${COLORS.textLight};
  font-size: 1.25rem;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

export default Label;
