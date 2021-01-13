import { Link } from "react-router-dom";
import { Container, Header, Message } from "semantic-ui-react";
import AdminEntry from "../components/AdminEntry";

const Admin = ({ user }) => {
  if (!user || !user.owner) {
    return (
      <Container>
        <Message error>
          <Message.Header>Access Forbidden</Message.Header>
          <p>
            If you're the administrator, please <Link to="/login">login</Link>.
          </p>
        </Message>
      </Container>
    );
  }
  return (
    <main>
      <Container>
        <Header as="h2">Admin Dashboard</Header>
        <AdminEntry />
      </Container>
    </main>
  );
};

export default Admin;
