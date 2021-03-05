import "../../styles/button.scss";

const Button = ({
  children,
  styleStatus,
  disableStatus,
  onClickHandler,
  handlerArgs,
}) => {
  const styleModifier = styleStatus ? `button-${styleStatus}` : "";
  return (
    <button
      className={`button ${styleModifier}`}
      disabled={disableStatus}
      onClick={() => onClickHandler(handlerArgs)}
    >
      {children}
    </button>
  );
};

export default Button;
