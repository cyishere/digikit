import styled from "styled-components/macro";
import TextLink from "../TextLink";
import { COLORS } from "../../styles/constants";

const DashHeader = () => {
  return (
    <Wrapper>
      <Title>
        <Logo src="./logo192.png" alt="digiKIT" /> Welcome, Debbie Ocean!
      </Title>
      <TextLink>Back to home</TextLink>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 48px;
  background-color: ${COLORS.white};
  border-bottom: 8px solid ${COLORS.grayLight};
`;

const Title = styled.h1`
  font-size: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Logo = styled.img`
  width: 66px;
  height: 66px;
  margin-right: 18px;
`;

export default DashHeader;
