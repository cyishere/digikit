import PageHeader from "../../components/PageHeader";
import LinkButton from "../../components/Button/LinkButton";
import "../../styles/table.scss";

const OrderHistory = () => {
  return (
    <main className="main-page">
      <PageHeader>Order History</PageHeader>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Order Number</th>
            <th>Place On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>dssjlejwlkejlwkje</td>
            <td>2021-03-12</td>
            <td>
              <LinkButton styleStatus="primary" toDirection="/order">
                View
              </LinkButton>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>dssjlejwlkejlwkje</td>
            <td>2021-03-12</td>
            <td>
              <LinkButton styleStatus="primary" toDirection="/order">
                View
              </LinkButton>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default OrderHistory;
