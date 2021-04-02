import styled from "styled-components/macro";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TextLink from "../../components/TextLink";

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
        {children}
      </div>
      <Footer>
        A mock website made with <Emoji>☕</Emoji> by{" "}
        <TextLink href="https://cyishere.dev">CY</TextLink>.
      </Footer>
    </>
  );
};

const Emoji = styled.span``;

export default Layout;
