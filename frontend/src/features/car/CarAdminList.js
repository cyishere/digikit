import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Icon, Image, List, Loader } from "semantic-ui-react";
import { getAllCars, selectAllCars } from "./carSlice";
import redCar from "../../images/red-vintage-car.jpg";

const CarAdminList = () => {
  const cars = useSelector(selectAllCars);
  const status = useSelector((state) => state.car.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllCars());
    }
  }, [dispatch, status]);

  return (
    <Container>
      <List divided>
        {cars.length > 0 &&
          cars.map((car) => (
            <List.Item key={car.id}>
              <List.Content floated="right">
                <a className="ui button olive" href={`/admin/car/${car.id}`}>
                  <Icon name="edit" /> Edit
                </a>
                <button className="ui button red">
                  <Icon name="trash alternate" /> Delete
                </button>
              </List.Content>
              <Image src={redCar} size="tiny" />
              <List.Content>
                <List.Header as={Link} to={`/car/${car.id}`}>
                  {car.title}
                </List.Header>
                <List.Description>
                  <span className="car-info_meta">{car.location}</span>
                  <span className="car-info_price">
                    $<span className="price">{car.price}</span>/day
                  </span>
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        {status === "loading" && (
          <List.Item>
            <Loader />
          </List.Item>
        )}
      </List>
    </Container>
  );
};

export default CarAdminList;
