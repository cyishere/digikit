import styled from "styled-components";
import { COLORS } from "../../styles/constants";

const SidebarCardItem = ({ name, isActive, ...rest }) => {
  return (
    <ListItem active={isActive} {...rest}>
      {name}
    </ListItem>
  );
};

const ListItem = styled.li`
  padding: 16px;
  background-color: ${(props) => (props.active ? COLORS.white : "transparent")};
  cursor: pointer;

  &:hover {
    color: ${COLORS.secondary};
  }
`;

export default SidebarCardItem;
