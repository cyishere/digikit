import styled from "styled-components/macro";
import { COLORS, BREAKPOINTS } from "../../styles/constants";

const Form = ({ children, ...rest }) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

export const Wrapper = styled.form`
  max-width: 800px;
  padding: 48px 150px;
  background-color: ${COLORS.white};
  margin: 0 auto;

  @media ${BREAKPOINTS.sm} {
    padding: 48px 32px;
  }
`;

export default Form;
