const express = require("express");
const router = express.Router();
const tagsController = require("../constrollers/tagsController");

/* GET users listing. */
router.get("/:id", tagsController.getTagById);
router.get("/", tagsController.getAllTags);
router.post("/", tagsController.createNewTag);

module.exports = router;
