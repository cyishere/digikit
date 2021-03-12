import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import formatCurrency from "../../utils/formatCurrency";
import { getProductById } from "./productSlice";
import { addToCart } from "../../slices/cartSlice";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import "./Product.scss";

const ProductShowPage = (props) => {
  const productId = props.match.params.id;
  const product = useSelector((state) => state.product.currentProduct);
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  const handleCheckout = ({ product, qty }) => {
    console.log(`Added ${qty} × ${product.id} to cart!`);
    dispatch(addToCart({ product, qty: parseInt(qty) }));
  };

  return (
    <main className="main-page">
      {product.title && (
        <div className="product-card">
          <div className="product-media">
            <img
              src={product.images[0]}
              alt={product.title}
              className="product-media__image"
            />
          </div>
          <div className="product-content">
            <PageHeader>{product.title}</PageHeader>
            <div className="product-meta price">
              ${formatCurrency(product.price)}
            </div>
            <div className="product-meta brand">
              <span className="meta category">{product.category}</span>
              <span className="meta brand">{product.brand}</span>
            </div>
            <div className="product-description">{product.description}</div>
            <div className="product-actions">
              <div className="product-meta">
                <label htmlFor="qty">Qty:</label>
                <input
                  type="number"
                  className="input-text small"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  min="1"
                />
                <span
                  className={
                    product.countInStock === 0 ? "meta warning" : "meta"
                  }
                >
                  {product.countInStock} in stock.
                </span>
              </div>
              <Button
                styleStatus="primary"
                disableStatus={product.countInStock === 0}
                onClickHandler={handleCheckout}
                handlerArgs={{ product, qty }}
              >
                <i className="la la-cart-arrow-down"></i> Add to Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductShowPage;
