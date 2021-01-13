const router = require("express").Router();
const Car = require("../models/car");
const logger = require("../utils/logger");

// Get ALL
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find({}).sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    logger.error(error.message);
  }
});

// Get ONE
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (car) res.json(car);

    res.status(404).send("Car Not Found");
  } catch (error) {
    logger.error(error.message);
  }
});

// Create

// Update

// Delete

module.exports = router;
