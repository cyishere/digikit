import { Grid } from "semantic-ui-react";
import CarItem from "./CarItem";

const cars = [
  {
    title: "Subaru Outback 2009",
    price: 17,
    location: "Los Angeles, CA 90033",
    createdAt: "2020-12-05T02:25:34.823Z",
    id: "5fcaef9ed2f515321a8c4102",
  },
  {
    title: "FIAT 500 2015",
    price: 20,
    location: "Glendale, CA 91204",
    createdAt: "2020-12-05T02:30:14.422Z",
    id: "5fcaf0b6e5f07f326223345c",
  },
  {
    title: "FIAT 500 2013",
    price: 19,
    location: "Los Angeles, CA 90065",
    createdAt: "2020-12-05T02:30:53.849Z",
    id: "5fcaf0dde5f07f326223345d",
  },
  {
    title: "Hyundai Elantra 2014",
    price: 23,
    location: "Los Angeles, CA 90065",
    createdAt: "2020-12-05T02:45:30.905Z",
    id: "5fcaf44a0bbd8432cc34cd8b",
  },
  {
    title: "FIAT 500 2012",
    price: 23,
    location: "Glendale, CA 91204",
    createdAt: "2020-12-05T05:37:46.627Z",
    id: "5fcb1caa3defac3937b0eab1",
  },
  {
    title: "Chevrolet Cruze 2013",
    price: 20,
    location: "Glendale, CA 91204",
    createdAt: "2020-12-05T05:48:26.060Z",
    id: "5fcb1f2a3defac3937b0eab2",
  },
  {
    title: "28 Days 1",
    price: 174,
    location: "Henderson, NV 89012",
    createdAt: "2020-12-05T05:50:42.269Z",
    id: "5fcb1fb23defac3937b0eab3",
  },
];

const CarList = () => {
  return (
    <main>
      <Grid columns={3}>
        {cars.map((car) => (
          <Grid.Column key={car.id}>
            <CarItem car={car} />
          </Grid.Column>
        ))}
      </Grid>
    </main>
  );
};

export default CarList;
