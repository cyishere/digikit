import styled from "styled-components/macro";
import { Container as Footer } from "../Footer/Footer";
import { COLORS } from "../../styles/constants";

const Brand = () => {
  return (
    <Wrapper>
      <TextLink href="/">
        digi<TextEm>kit</TextEm>
      </TextLink>
    </Wrapper>
  );
};

export const Wrapper = styled.h1`
  font-family: Actor;
  font-size: 2.5rem;

  ${Footer} & {
    font-size: 2rem;
  }
`;

export const TextLink = styled.a`
  color: ${COLORS.text};
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    color: ${COLORS.secondary};
    text-decoration: revert;
  }

  ${Wrapper} & {
    color: ${COLORS.primary};
    text-transform: none;

    &:hover {
      color: ${COLORS.text};
    }
  }
`;

export const TextEm = styled.span`
  color: ${COLORS.text};
  text-transform: uppercase;

  &:hover {
    color: ${COLORS.primary};
  }
`;

export default Brand;
