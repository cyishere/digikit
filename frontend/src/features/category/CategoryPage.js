import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "./categorySlice";
import Message from "../../components/Message";

const CategoryPage = ({ token }) => {
  const categories = useSelector((state) => state.category.entities);
  const message = useSelector((state) => state.category.message);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getAllCategories(token));
    }
  }, [token, dispatch]);

  return (
    <main className="main-page">
      <header className="page-header">
        <h2 className="page-header__title">All Categories</h2>
      </header>
      {message && <Message msgContent={message} msgStatus="error" />}
      {!message && (
        <section className="section">
          <ul className="category-list">
            {categories.map((category) => (
              <li className="category-list__item" key={category.id}>
                {category.title}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};

export default CategoryPage;
