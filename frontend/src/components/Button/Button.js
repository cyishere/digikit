import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { Wrapper as Form } from "../Form/Form";
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
  danger: {
    "--backgroundColor": COLORS.danger,
    "--textColor": COLORS.white,
  },
};

const Button = ({ variant, href, children, ...rest }) => {
  const styles = VARIANTS[variant];

  const tag = typeof href === "string" ? Link : "button";

  return (
    <Wrapper as={tag} style={styles} to={href} {...rest}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  background-color: var(--backgroundColor);
  color: var(--textColor);
  padding: 16px 24px;
  text-transform: uppercase;
  text-decoration: none;
  border: none;
  font: inherit;

  &:hover {
    opacity: 0.8;
  }

  ${Form} & {
    width: 100%;
  }
`;

export default Button;
