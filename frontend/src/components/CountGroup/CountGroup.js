import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";

const CountGroup = () => {
  return (
    <Group>
      <Button>-</Button>
      <Input type="text" value="1" />
      <Button>+</Button>
    </Group>
  );
};

const Group = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  font-size: 1.25rem;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  border: 1px solid ${COLORS.primary};
  padding: 0 16px;
  height: 36px;
  line-height: 36px;
  width: 60px;
  color: ${COLORS.textLight};
`;

export default CountGroup;
