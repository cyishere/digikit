import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";
import SidebarCardItem from "./SidebarCardItem";

const SidebarCard = ({ title, listContent }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <ul>
        <SidebarCardItem name="All" isActive={true} />
        {listContent.map((item, i) => (
          <SidebarCardItem key={i} name={item.name} />
        ))}
      </ul>
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
