import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";

const VARIANTS = {
  default: {
    "--backgroundColor": COLORS.grayLightDim,
    "--textColor": COLORS.text,
  },
  primary: {
    "--backgroundColor": COLORS.primary,
    "--textColor": COLORS.white,
  },
  secondary: {
    "--backgroundColor": COLORS.secondary,
    "--textColor": COLORS.white,
  },
};

const Button = ({ variant, href, children, ...rest }) => {
  const styles = VARIANTS[variant];

  const tag = typeof href === "string" ? "a" : "button";

  return (
    <Wrapper as={tag} style={styles} {...rest}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  background-color: var(--backgroundColor);
  color: var(--textColor);
  padding: 16px 24px;
  text-transform: uppercase;
  border: none;
  font: inherit;
  cursor: default;

  &:hover {
    opacity: 0.8;
  }
`;

export default Button;
