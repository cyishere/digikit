import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
