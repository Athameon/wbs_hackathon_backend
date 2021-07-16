const {
  getRestaurantTags,
  getRestaurantComments,
  calculateAverageRating,
} = require("../tools/restaurant");
const { Pool } = require("pg");
const pool = new Pool();

const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurantResult = await pool.query(
      `SELECT r.id, r.name as restaurant_name, r.lan, r.lat, r.description, c.id as city_id, c.name as city_name, r.picture 
      FROM restaurant r 
      LEFT OUTER JOIN city c ON c.id = r.city_id 
      ORDER BY r.id;`
    );
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

const getRestaurantById = async (req, res, next) => {
  const { id } = req.params;

  const restaurantQuery = {
    text: `SELECT r.id, r.name as restaurant_name, r.lan, r.lat, r.description, c.id as city_id, c.name as city_name, r.picture 
    FROM restaurant r 
    LEFT OUTER JOIN city c ON c.id = r.city_id 
    WHERE r.id = $1 
    ORDER BY r.id;`,
    values: [id],
  };

  try {
    const restaurantResult = await pool.query(restaurantQuery);
    if (restaurantResult.rows.length === 0) {
      return res
        .status(404)
        .send(`The restaurant with the id ${id} does not exist`);
    }
    const restaurant = [restaurantResult.rows[0]];
    await Promise.all([
      getRestaurantTags(restaurant),
      getRestaurantComments(restaurant),
    ]);
    calculateAverageRating(restaurant);

    res.send(restaurant[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const createNewRestaurant = async (req, res, next) => {
  const { name, city, description, lat, lan, picture, tags } = req.body;

  const createRestaurantQuery = {
    text: `INSERT INTO restaurant (name, city_id, description, lat, lan, picture) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    values: [name, city, description, lat, lan, picture],
  };

  try {
    const createRestaurantResult = await pool.query(createRestaurantQuery);
    const restaurantId = createRestaurantResult.rows[0].id;

    tags.forEach(async (tag) => {
      const createRestaurantTagQuery = {
        text: `INSERT INTO restaurant_has_tag (id_restaurant, id_tag) VALUES ($1, $2) RETURNING *`,
        values: [restaurantId, tag],
      };
      const createResult = await pool.query(createRestaurantTagQuery);
      console.log(createResult.rows[0]);
    });

    if (createRestaurantResult.rowCount < 1) {
      return res.status(404).send("Could not create the restaurant.");
    }

    res.send(createRestaurantResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createNewRestaurant,
};
