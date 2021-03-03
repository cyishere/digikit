import "../../styles/button.scss";

const Button = ({ children, styleStatus, disableStatus }) => {
  const styleModifier = styleStatus ? `button-${styleStatus}` : "";
  return (
    <button className={`button ${styleModifier}`} disabled={disableStatus}>
      {children}
    </button>
  );
};

export default Button;
