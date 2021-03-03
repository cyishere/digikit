import "../../styles/button.scss";

const Button = ({ children, styleStatus, disableStatus }) => {
  return (
    <button className={`button button-${styleStatus}`} disabled={disableStatus}>
      {children}
    </button>
  );
};

export default Button;
