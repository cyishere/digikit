import { Button } from "semantic-ui-react";
import redCar from "../../images/red-vintage-car.jpg";

const car = {
  title: "Chevrolet Cruze 2013",
  location: "Glendale, CA 91204",
  price: 20,
};

const CarPage = () => {
  return (
    <main className="car-page">
      <section className="car-info">
        <div className="car-info_images">
          <img src={redCar} alt={car.title} />
        </div>

        <div className="car-info_content">
          <h2 className="car-info_title">{car.title}</h2>
          <p className="car-info_meta">{car.location}</p>
          <div className="car-info_description">
            <p>
              Veniam minim reprehenderit sint exercitation id dolor dolore.
              Irure cillum non non minim. Et sit anim eiusmod nisi in cillum
              ullamco labore est sunt nisi anim amet incididunt. Occaecat ipsum
              cupidatat aliquip ea dolor esse. Aliquip nulla nulla aute amet.
            </p>
          </div>
          <p className="car-info_price">
            $<span className="price">{car.price}</span>/day
          </p>
          <Button primary>Rent</Button>
        </div>
      </section>
    </main>
  );
};

export default CarPage;
