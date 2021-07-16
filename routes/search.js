const express = require("express");
const router = express.Router();
const searchController = require("../constrollers/searchController");

/* GET users listing. */
router.get("/:key", searchController.getRestaurantBySearch);

module.exports = router;
