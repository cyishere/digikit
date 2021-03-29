import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";

const VARIANTS = {
  info: {
    "--bgColor": COLORS.infoLight,
    "--textColor": COLORS.info,
  },
  danger: {
    "--bgColor": COLORS.dangerLight,
    "--textColor": COLORS.danger,
  },
};

const Message = ({ children, variant }) => {
  const styles = VARIANTS[variant];

  return <Wrapper style={styles}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  color: var(--textColor);
  background-color: var(--bgColor);
  border: 1px solid currentColor;
  padding: 16px;
  margin-bottom: 32px;
  line-height: 1.4;
`;

export default Message;
