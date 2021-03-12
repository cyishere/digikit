import CartSidebar from "./CartSidebar";

const CartSidebarLayout = ({ children }) => {
  return (
    <aside className="checkout-page__sidebar">
      <CartSidebar />

      {children}
    </aside>
  );
};

export default CartSidebarLayout;
