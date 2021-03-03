import "./PageHeader.scss";

const PageHeader = ({ children }) => {
  return (
    <header className="page-header">
      <h2 className="page-header__title">{children}</h2>
    </header>
  );
};

export default PageHeader;
