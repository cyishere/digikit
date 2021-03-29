import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";

const Breadcrumbs = ({ children }) => {
  return (
    <Wrapper aria-label="Breadcrumb">
      <ol>{children}</ol>
    </Wrapper>
  );
};

export const Wrapper = styled.nav`
  border-bottom: ${COLORS.grayLightDim};
  margin-bottom: 48px;
`;

export default Breadcrumbs;
