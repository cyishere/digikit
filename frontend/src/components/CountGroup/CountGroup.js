import { useState } from "react";

import styled from "styled-components/macro";
import { COLORS } from "../../styles/constants";

const CountGroup = ({ countInStock }) => {
  const [qty, setQty] = useState(1);

  const handleIncrease = () => setQty(qty + 1);

  const handleDecrease = () => setQty(qty - 1);
  return (
    <Group>
      <Button disabled={qty <= 1} onClick={handleDecrease}>
        -
      </Button>
      <Input type="text" value={qty} readOnly />
      <Button disabled={qty === countInStock} onClick={handleIncrease}>
        +
      </Button>
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
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
