const express = require("express");
const router = express.Router();
const restaurantsController = require("../constrollers/restaurantsController");

/* GET users listing. */
router.get("/:id", restaurantsController.getRestaurantById);
router.get("/", restaurantsController.getAllRestaurants);
router.post("/", restaurantsController.createNewRestaurant);

module.exports = router;
