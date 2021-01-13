import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";

const CarItem = ({ car }) => {
  return (
    <Card as={Link} to={`/car/${car.id}`}>
      <Card.Content>
        <Card.Header as="h3">{car.title}</Card.Header>
        <Card.Meta>{car.location}</Card.Meta>
        <Card.Description>
          $<span className="price">{car.price}</span>/day
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default CarItem;
