import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { FooterContainer } from "../Footer/Footer";
import { COLORS } from "../../styles/constants";

const TextLink = ({ children, href, to }) => {
  const tag = to ? Link : "a";
  return (
    <Wrapper as={tag} to={to} href={href}>
      {children}
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  color: ${COLORS.text};
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    color: ${COLORS.secondary};
    text-decoration: revert;
  }

  ${FooterContainer} & {
    color: ${COLORS.secondary};

    &:hover {
      color: ${COLORS.text};
    }
  }
`;

export default TextLink;
