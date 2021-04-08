import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { COLORS, BREAKPOINTS } from "../../styles/constants";

const Brand = () => {
  return (
    <Wrapper>
      <TextLink to="/">
        digi<TextEm>kit</TextEm>
      </TextLink>
    </Wrapper>
  );
};

export const Wrapper = styled.h1`
  font-family: Actor;
  font-size: 2.5rem;

  @media ${BREAKPOINTS.sm} {
    margin-bottom: 32px;
  }
`;

export const TextLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    color: ${COLORS.secondary};
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
