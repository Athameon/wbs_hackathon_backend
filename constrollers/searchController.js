const {
  getRestaurantTags,
  getRestaurantComments,
  calculateAverageRating,
} = require("../tools/restaurant");
const { Pool } = require("pg");
const pool = new Pool();

const getRestaurantBySearch = async (req, res, next) => {
  const { key } = req.params;

  const restaurantNameQuery = {
    text: `SELECT r.id, r.name as restaurant_name, r.lan, r.lat, r.description, c.id as city_id, c.name as city_name, r.picture 
    FROM restaurant r 
    LEFT OUTER JOIN city c ON c.id = r.city_id 
    WHERE lower(r.name) LIKE $1 
    ORDER BY r.id;`,
    values: ["%" + key.toLowerCase() + "%"],
  };

  const restaurantTagQuery = {
    text: `SELECT r.id, r.name as restaurant_name, r.lan, r.lat, r.description, c.id as city_id, c.name as city_name, r.picture 
    FROM restaurant r 
    LEFT OUTER JOIN city c ON c.id = r.city_id 
    JOIN restaurant_has_tag rt ON rt.id_restaurant = r.id
    JOIN tag t ON t.id = rt.id_tag
    WHERE lower(t.name) LIKE $1 
    ORDER BY r.id;`,
    values: ["%" + key.toLowerCase() + "%"],
  };

  try {
    const [nameSearchRestult, tagSearchResult] = await Promise.all([
      pool.query(restaurantNameQuery),
      pool.query(restaurantTagQuery),
    ]);

    if (
      nameSearchRestult.rows.length === 0 &&
      tagSearchResult.rows.length === 0
    ) {
      return res.status(404).send("[]");
    }
    let restaurants = [...nameSearchRestult.rows, ...tagSearchResult.rows];
    restaurants = restaurants.filter(
      (restaurant, index, self) =>
        index === self.findIndex((t) => t.id === restaurant.id)
    );

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

module.exports = {
  getRestaurantBySearch,
};
