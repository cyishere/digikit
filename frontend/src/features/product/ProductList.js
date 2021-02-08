import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "./productSlice";

import "./Product.scss";
import "../../styles/card.scss";

const ProductList = () => {
  const products = useSelector((state) => state.product.entities);
  console.log("products:", products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <main className="main-page">
      <header className="page-header">
        <h2 className="page-header__title">All Products</h2>
      </header>
      <div className="products-grid">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <div className="card-media">
                <img
                  className="card-media__image"
                  src={product.images[0]}
                  alt={product.title}
                />
              </div>
              <div className="card-content">
                <h3 className="card-content__title">{product.title}</h3>
                <div className="card-content__meta price">${product.price}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductList;
