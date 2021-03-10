import { Link } from "react-router-dom";
import "../../styles/button.scss";

const LinkButton = ({ children, styleStatus, toDirection }) => {
  const styleModifier = styleStatus ? `button-${styleStatus}` : "";
  return (
    <Link className={`button ${styleModifier}`} to={toDirection}>
      {children}
    </Link>
  );
};

export default LinkButton;
