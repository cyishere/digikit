import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="admin__sidebar">
      <ul className="admin__sidebar-nav">
        <li className="admin__sidebar-nav-item">
          <Link to="/admin">Dashboard</Link>
        </li>
        <li className="admin__sidebar-nav-item">
          <Link to="/admin/order">Order</Link>
        </li>
        <li className="admin__sidebar-nav-item">
          <Link to="/admin/product">Product</Link>
        </li>
        <li className="admin__sidebar-nav-item">
          <Link to="/admin/category">Category</Link>
        </li>
        <li className="admin__sidebar-nav-item">
          <Link to="/admin/user">User</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
