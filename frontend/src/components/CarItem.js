import { Card } from "semantic-ui-react";

const CarItem = ({ car }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header as="h3">{car.title}</Card.Header>
        <Card.Meta>{car.location}</Card.Meta>
        <Card.Description className="car-price">${car.price}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default CarItem;
