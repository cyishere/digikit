import Layout from "./Layout";

const Dashboard = () => {
  return (
    <Layout>
      <section className="grid grid-1-1-1">
        <div className="card">
          <div className="card-header">
            <h2 className="card-header__title">Order</h2>
          </div>
          <div className="card-content">
            <p>10</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-header__title">Product</h2>
          </div>
          <div className="card-content">
            <p>6</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-header__title">User</h2>
          </div>
          <div className="card-content">
            <p>10</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
