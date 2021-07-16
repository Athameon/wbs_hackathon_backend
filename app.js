require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const restaurantRouter = require("./routes/restaurants");
const tagsRouter = require("./routes/tags");
const citiesRouter = require("./routes/cities");
const searchRouter = require("./routes/search");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/restaurants", restaurantRouter);
app.use("/tags", tagsRouter);
app.use("/cities", citiesRouter);
app.use("/search", searchRouter);

module.exports = app;
