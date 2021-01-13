import { Link } from "react-router-dom";
import { Grid, Icon, Segment } from "semantic-ui-react";

const AdminEntry = () => {
  return (
    <Grid columns="equal">
      <Grid.Row>
        <Grid.Column as={Link} to="/admin/car" textAlign="center">
          <Segment>
            <Icon name="truck" />
            <p>Cars</p>
          </Segment>
        </Grid.Column>
        <Grid.Column as={Link} to="/admin/user" textAlign="center">
          <Segment>
            <Icon name="users" />
            <p>User</p>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default AdminEntry;
