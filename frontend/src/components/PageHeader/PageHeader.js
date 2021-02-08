import "./PageHeader.scss";

const PageHeader = ({ titleText }) => {
  return (
    <header className="page-header">
      <h2 className="page-header__title">{titleText}</h2>
    </header>
  );
};

export default PageHeader;
