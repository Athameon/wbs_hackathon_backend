const {
  getRestaurantTags,
  getRestaurantComments,
  calculateAverageRating,
} = require("../tools/restaurant");

const { Pool } = require("pg");
const pool = new Pool();

const getAllCities = (req, res, next) => {
  pool.query("SELECT * FROM city;").then((result) => {
    if (result.rows.length === 0) {
      res.send("No cities are stored in the db.");
    }
    res.send(result.rows);
  });
};

const getRestaurantByCityId = async (req, res, next) => {
  const { id } = req.params;
  const restaurantQuery = {
    text: `SELECT r.id, r.name as restaurant_name, r.lan, r.lat, r.description, c.id as city_id, c.name as city_name, r.picture 
    FROM restaurant r 
    LEFT OUTER JOIN city c ON c.id = r.city_id 
    WHERE c.id = $1
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

const createNewCity = async (req, res, next) => {
  const { name } = req.body;
  const createTagQuery = {
    text: `INSERT INTO city (name) values ($1) RETURNING *`,
    values: [name],
  };

  try {
    const createResult = await pool.query(createTagQuery);
    console.log(createResult);
    if (createResult.rowCount < 1) {
      return res.status(404).send("Could not create the city.");
    }

    res.send(createResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getRestaurantByCityId,
  getAllCities,
  createNewCity,
};
