import styled from "styled-components/macro";
import { Wrappre as Footer } from "../Footer";
import { COLORS } from "../../styles/constants";

const TextLink = ({ children, href }) => {
  return <Wrapper href={href}>{children}</Wrapper>;
};

export const Wrapper = styled.a`
  color: ${COLORS.text};
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    color: ${COLORS.secondary};
    text-decoration: revert;
  }

  ${Footer} & {
    color: ${COLORS.secondary};

    &:hover {
      color: ${COLORS.text};
    }
  }
`;

export default TextLink;
