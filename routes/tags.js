const express = require("express");
const router = express.Router();
const tagsController = require("../constrollers/tagsController");

/* GET users listing. */
router.get("/:id", tagsController.getRestaurantByTagId);
router.get("/", tagsController.getAllTags);
router.post("/", tagsController.createNewTag);

module.exports = router;
