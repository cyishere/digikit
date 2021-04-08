import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";

const SidebarCard = ({ children, title }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 48px;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  color: ${COLORS.textLight};
  text-transform: uppercase;
  margin-bottom: 16px;
`;

export default SidebarCard;
