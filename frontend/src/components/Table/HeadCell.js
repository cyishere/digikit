import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";

const HeadCell = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.th`
  font-weight: 500;
  text-transform: uppercase;
  text-align: left;
  color: ${COLORS.textLight};
  padding: 24px;
  border-bottom: 8px solid ${COLORS.grayLightDim};
`;

export default HeadCell;
