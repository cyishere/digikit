import "./CartIcon.scss";

const CartIcon = ({ cartItems }) => {
  return (
    <div className="cart-icon">
      <i className="las la-shopping-cart"></i>
      <i className="cart-icon__number">{cartItems.length}</i>
    </div>
  );
};

export default CartIcon;
