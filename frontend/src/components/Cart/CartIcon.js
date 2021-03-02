import "./CartIcon.scss";

const CartIcon = ({ handleShowWidget }) => {
  return (
    <div className="cart-icon" onClick={handleShowWidget}>
      <i className="las la-shopping-cart"></i>
      <i className="cart-icon__number">10</i>
    </div>
  );
};

export default CartIcon;
