const {
  getRestaurantTags,
  getRestaurantComments,
  calculateAverageRating,
} = require("../tools/restaurant");
const { Pool } = require("pg");
const pool = new Pool();

const getAllTags = (req, res, next) => {
  pool.query("SELECT * FROM tag;").then((result) => {
    if (result.rows.length === 0) {
      res.send("No tags are stored in the db.");
    }
    res.send(result.rows);
  });
};

const getRestaurantByTagId = async (req, res, next) => {
  const { id } = req.params;

  const restaurantQuery = {
    text: `SELECT r.id, r.name as restaurant_name, r.lan, r.lat, r.description, r.picture, t.id_tag
    FROM restaurant_has_tag t
    JOIN restaurant r on r.id = t.id_restaurant
    WHERE id_tag = $1 
    ORDER BY r.id`,
    values: [id],
  };

  try {
    const restaurantResult = await pool.query(restaurantQuery);
    if (restaurantResult.rows.length === 0) {
      return res.status(404).send("No restaurants are stored in the db.");
    }
    const restaurants = restaurantResult.rows;
    await Promise.all([
      getRestaurantTags(restaurants),
      getRestaurantComments(restaurants),
    ]);
    calculateAverageRating(restaurants);

    res.send(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const createNewTag = async (req, res, next) => {
  const { tag } = req.body;
  const createTagQuery = {
    text: `INSERT INTO tag (name) values ($1) RETURNING *`,
    values: [tag],
  };

  try {
    const createResult = await pool.query(createTagQuery);
    console.log(createResult);
    if (createResult.rowCount < 1) {
      return res.status(404).send("Could not create the tag.");
    }

    res.send(createResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getRestaurantByTagId,
  getAllTags,
  createNewTag,
};
