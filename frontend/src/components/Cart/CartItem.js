import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";
import "./CartItem.scss";

const CartItem = ({ styleStatus, product }) => {
  const [qty, setQty] = useState(product.qty || 1);

  useEffect(() => {
    setQty(product.qty);
  }, [product]);

  return (
    <div className={`cart-item ${styleStatus ? styleStatus : ""}`}>
      <div className="cart-item__cover">
        <img
          className="cart-item__cover-img"
          src={product.images[0]}
          alt={product.title}
        />
      </div>
      <div className="cart-item__info">
        <h3 className="cart-item__info-title">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>
      </div>
      <div className="cart-item__meta">
        <div className="cart-item__count">
          <label htmlFor="qty">Qty:</label>
          <input
            type="number"
            id="qty"
            className="input-text small"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </div>
        <div className="cart-item__price">${formatCurrency(product.price)}</div>
      </div>
    </div>
  );
};

export default CartItem;
