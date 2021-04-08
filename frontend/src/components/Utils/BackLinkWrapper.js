import styled from "styled-components/macro";
import { Section as AdminSubLayout } from "../Admin/SubLayout";
import { COLORS } from "../../styles/constants";

const BackLinkWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export const Wrapper = styled.p`
  margin-bottom: 48px;

  ${AdminSubLayout} & {
    margin-bottom: 0;

    a {
      color: ${COLORS.adminPrimary};
    }
  }
`;

export default BackLinkWrapper;
