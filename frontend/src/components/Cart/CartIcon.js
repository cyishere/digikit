import "./CartIcon.scss";

const CartIcon = () => {
  return (
    <div className="cart-icon">
      <i className="las la-shopping-cart"></i>
      <i className="cart-icon__number">10</i>
    </div>
  );
};

export default CartIcon;
