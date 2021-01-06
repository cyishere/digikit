import { Segment } from "semantic-ui-react";

const Footer = () => {
  return (
    <footer>
      <Segment textAlign="center">
        Made with
        <span className="emoji" role="img">
          ☕
        </span>
        by <a href="https://cyishere.dev">CY</a>.
      </Segment>
    </footer>
  );
};

export default Footer;
