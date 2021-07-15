const express = require("express");
const router = express.Router();
const citiesController = require("../constrollers/citiesController");

/* GET users listing. */
router.get("/:id", citiesController.getCityById);
router.get("/", citiesController.getAllCities);
router.post("/", citiesController.createNewCity);

module.exports = router;
