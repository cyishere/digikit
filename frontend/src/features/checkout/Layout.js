import CheckoutStatus from "../../components/CheckoutStatus";
import PageHeader from "../../components/PageHeader";
import CartSidebar from "../../components/Cart/CartSidebar";

const Layout = ({ children, path, pageTitle, proceedText }) => {
  return (
    <main className="main checkout-page">
      <CheckoutStatus status={path[path.length - 1]} />

      <PageHeader>{pageTitle}</PageHeader>

      <section className="section grid sw-3-1">
        <div className="checkout-page__body">{children}</div>

        <CartSidebar text={proceedText} />
      </section>
    </main>
  );
};

export default Layout;
