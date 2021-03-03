import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "./productSlice";
import PageHeader from "../../components/PageHeader/PageHeader";
import Button from "../../components/Button/Button";
import "./Product.scss";

const ProductShowPage = (props) => {
  const productId = props.match.params.id;
  const product = useSelector((state) => state.product.currentProduct);
  const [buyCount, setBuyCount] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

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
            <div className="product-meta price">${product.price}</div>
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
                  value={buyCount}
                  onChange={(e) => setBuyCount(e.target.value)}
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
