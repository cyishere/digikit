import { useEffect } from "react";
import { Grid, Loader, Message } from "semantic-ui-react";
import CarItem from "./CarItem";

import { getAllCars, selectAllCars } from "./carsSlice";
import { useDispatch, useSelector } from "react-redux";

const CarList = () => {
  const cars = useSelector(selectAllCars);
  const { status, error } = useSelector((state) => state.cars);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllCars());
    }
  }, [dispatch, status]);

  const errorMsg =
    status === "failed" ? (
      <Message negative>
        <Message.Header>Something wrong...</Message.Header>
        <p>{error}</p>
      </Message>
    ) : null;

  return (
    <main>
      {errorMsg}
      {status === "loading" ? (
        <Grid columns={1}>
          <Grid.Column>
            <Loader active inline="centered" />
          </Grid.Column>
        </Grid>
      ) : (
        <Grid columns={3}>
          {cars.map((car) => (
            <Grid.Column key={car.id}>
              <CarItem car={car} />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </main>
  );
};

export default CarList;
