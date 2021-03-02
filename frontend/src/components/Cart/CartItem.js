import { Link } from "react-router-dom";
import "./CartItem.scss";

const CartItem = () => {
  return (
    <div className="cart-item">
      <div className="cart-item__cover">
        <img
          className="cart-item__cover-img"
          src="https://cdn.shopifycdn.net/s/files/1/1183/1328/products/1_0ce471b1-1a7a-4873-a2f0-fd71d0d15df0_1800x1800.jpg?v=1606275054"
          alt=""
        />
      </div>
      <div className="cart-item__info">
        <h3 className="cart-item__info-title">
          <Link to="/">
            IQUNIX L80 Formula Typing Wireless Mechanical Keyboard
          </Link>
        </h3>
      </div>
      <div className="cart-item__meta">
        <div className="cart-item__count">
          <label htmlFor="count">Qty:</label>
          <input type="number" id="count" className="qty" defaultValue="1" />
        </div>
        <div className="cart-item__price">$265.00</div>
      </div>
    </div>
  );
};

export default CartItem;
