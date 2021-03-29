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
  padding-top: 32px;
  padding-bottom: 32px;
  margin-bottom: 32px;
`;

export default Breadcrumbs;
