import "./Message.scss";

const Message = ({ msgHeader, msgContent, msgStatus }) => {
  return (
    <div className={`message ${msgStatus}`}>
      {msgHeader && <h4 className="message__header">{msgHeader}</h4>}
      <div className="message__content">{msgContent}</div>
    </div>
  );
};

export default Message;
