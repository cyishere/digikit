import Sidebar from "../../components/Admin/Sidebar";

const Layout = ({ children }) => {
  return (
    <main className="main-page">
      <div className="grid grid-1-3">
        <Sidebar />
        <section>{children}</section>
      </div>
    </main>
  );
};

export default Layout;
