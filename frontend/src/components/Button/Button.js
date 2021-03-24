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

const Button = ({ variant, children, ...rest }) => {
  const styles = VARIANTS[variant];

  return (
    <Wrapper style={styles} {...rest}>
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
`;

export default Button;
