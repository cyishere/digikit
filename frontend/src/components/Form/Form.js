import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";

const Form = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export const Wrapper = styled.form`
  max-width: 800px;
  padding: 48px 150px;
  background-color: ${COLORS.white};
  margin: 0 auto;
`;

export default Form;
